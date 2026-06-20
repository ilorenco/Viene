// Card de um item de moderação (evento ou ator). Mostra o tipo, quem solicitou
// (ator/usuário) e, se já revisado, a decisão (Aprovado/Rejeitado) — escondendo
// os botões de aprovar/rejeitar nesse caso.

import { Check, X } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { TYPE_LABELS, TYPE_VARIANTS } from '@/lib/adminLabels'

const SUBMITTER_LABELS = { ator: 'Ator', usuario: 'Usuário comum' }

export function ApprovalCard({ item, onReview, onApprove, onReject, disabled = false }) {
    return (
        <li className="border-secondary/10 flex flex-col gap-3 rounded-2xl border bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant={TYPE_VARIANTS[item.type]}>{TYPE_LABELS[item.type]}</Badge>
                {item.reviewed && (
                    <Badge variant={item.decision === 'aprovado' ? 'success' : 'danger'}>
                        {item.decision === 'aprovado' ? 'Aprovado' : 'Rejeitado'}
                    </Badge>
                )}
            </div>

            <h3 className="text-secondary font-bold">{item.title}</h3>
            <p className="text-secondary/70 text-sm">{item.summary}</p>
            <p className="text-secondary/50 text-xs">
                Solicitado por {item.submittedBy}
                {item.submitterType ? ` (${SUBMITTER_LABELS[item.submitterType]})` : ''} •{' '}
                {item.submittedAt}
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onReview}
                    className="border-secondary/20 text-secondary flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition active:scale-95"
                >
                    Revisar
                </button>
                {!item.reviewed && (
                    <>
                        <button
                            type="button"
                            aria-label="Aprovar"
                            onClick={onApprove}
                            disabled={disabled}
                            className="rounded-full bg-green-100 p-2 text-green-700 transition active:scale-90 disabled:opacity-50"
                        >
                            <Check className="size-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Rejeitar"
                            onClick={onReject}
                            disabled={disabled}
                            className="bg-danger/15 text-danger rounded-full p-2 transition active:scale-90 disabled:opacity-50"
                        >
                            <X className="size-5" />
                        </button>
                    </>
                )}
            </div>
        </li>
    )
}
