// Sub-seção "Denúncias" da Plataforma (admin): lista as denúncias de atores que os
// usuários enviaram (com a justificativa) e permite "resolver" (descartar) cada uma.
// Dados via React Query (useAdminReports + <Suspense>); a mutação invalida a query.

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Flag, Trash2 } from 'lucide-react'
import { Suspense } from 'react'

import { ADMIN_KEYS, useAdminReports } from '@/features/admin/hooks/useAdminData'
import { resolveReport } from '@/features/admin/services/reports'

function DenunciasList() {
    const { data: reports } = useAdminReports()
    const queryClient = useQueryClient()

    const resolve = useMutation({
        mutationFn: resolveReport,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.reports }),
    })

    if (!reports.length) {
        return (
            <p className="text-secondary/60 border-secondary/10 rounded-2xl border bg-white p-6 text-center text-sm">
                Nenhuma denúncia no momento.
            </p>
        )
    }

    return (
        <ul className="flex flex-col gap-3">
            {reports.map((report) => (
                <li
                    key={report.id}
                    className="border-secondary/10 flex flex-col gap-2 rounded-2xl border bg-white p-4"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="bg-danger/10 text-danger flex size-8 shrink-0 items-center justify-center rounded-full">
                                <Flag className="size-4" />
                            </span>
                            <div>
                                <p className="text-secondary flex items-center gap-2 font-bold">
                                    {report.name}
                                    <span className="bg-secondary/10 text-secondary/70 rounded-full px-2 py-0.5 text-xs font-semibold">
                                        {report.type === 'evento' ? 'Evento' : 'Ator'}
                                    </span>
                                </p>
                                <p className="text-secondary/50 text-xs">{report.date}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => resolve.mutate(report.id)}
                            disabled={resolve.isPending}
                            className="text-secondary/60 hover:text-danger flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition active:scale-95 disabled:opacity-50"
                        >
                            <Trash2 className="size-4" />
                            Resolver
                        </button>
                    </div>
                    <p className="text-secondary/80 text-sm">{report.reason}</p>
                </li>
            ))}
        </ul>
    )
}

function DenunciasSkeleton() {
    return (
        <ul className="flex animate-pulse flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className="bg-secondary/10 h-24 rounded-2xl" />
            ))}
        </ul>
    )
}

export function AdminDenuncias() {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-montserrat text-secondary text-sm font-extrabold">Denúncias</h3>
            <Suspense fallback={<DenunciasSkeleton />}>
                <DenunciasList />
            </Suspense>
        </div>
    )
}
