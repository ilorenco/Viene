// Aba "Ajuda" do admin, separada por tipo:
//   - Solicitações dos usuários (perguntas enviadas, a responder)
//   - Perguntas publicadas (FAQ que aparece na página pública)

import { Suspense, useState } from 'react'

import { AdminFaqList } from '@/features/admin/components/AdminFaqList'
import { AdminQuestionList } from '@/features/admin/components/AdminQuestionList'
import { AdminSkeleton } from '@/features/admin/components/AdminSkeleton'
import { cn } from '@/lib/utils'

const types = [
    { value: 'solicitacoes', label: 'Solicitações' },
    { value: 'publicadas', label: 'Publicadas' },
]

export function AdminHelp() {
    const [type, setType] = useState('solicitacoes')

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                {types.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setType(option.value)}
                        aria-pressed={type === option.value}
                        className={cn(
                            'flex-1 rounded-full px-3 py-2 text-sm font-semibold transition',
                            type === option.value
                                ? 'bg-primary text-secondary'
                                : 'bg-secondary/10 text-secondary',
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <Suspense fallback={<AdminSkeleton />}>
                {type === 'solicitacoes' ? <AdminQuestionList /> : <AdminFaqList />}
            </Suspense>
        </div>
    )
}
