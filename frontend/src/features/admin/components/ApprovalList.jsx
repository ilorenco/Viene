// Aba "Aprovações": lista de solicitações de moderação (eventos/atores), com
// busca e 4 filtros independentes — quem solicitou (ator/usuário), tipo
// (evento/ator), ordenação (recentes/antigos) e revisado ("Todos", por último).
// A REGRA de filtro/ordenação fica no hook useFilteredApprovals; aqui a tela só
// guarda o estado dos filtros, desenha e trata a moderação (que invalida a query).

import { useQueryClient } from '@tanstack/react-query'
import {
    ArrowDownNarrowWide,
    ArrowUpNarrowWide,
    Building2,
    CalendarDays,
    CircleCheck,
    Clock,
    ListChecks,
    Search,
    SlidersHorizontal,
    User,
    UserCog,
} from 'lucide-react'
import { useState } from 'react'

import { ApprovalCard } from '@/features/admin/components/ApprovalCard'
import { FilterSelect } from '@/features/admin/components/FilterSelect'
import { ModerationModal } from '@/features/admin/components/ModerationModal'
import { ADMIN_KEYS } from '@/features/admin/hooks/useAdminData'
import { useFilteredApprovals } from '@/features/admin/hooks/useFilteredApprovals'
import { addModerationComment, moderateApproval } from '@/features/admin/services/admin'
import { useFeedback } from '@/hooks/useFeedback'

const SUBMITTER_OPTIONS = [
    { value: 'todos', label: 'Quem: todos', icon: UserCog },
    { value: 'ator', label: 'Por ator', icon: Building2 },
    { value: 'usuario', label: 'Por usuário', icon: User },
]
const TYPE_OPTIONS = [
    { value: 'todos', label: 'Tipo: todos', icon: SlidersHorizontal },
    { value: 'evento', label: 'Eventos', icon: CalendarDays },
    { value: 'ator', label: 'Atores', icon: Building2 },
]
const SORT_OPTIONS = [
    { value: 'recentes', label: 'Mais recentes', icon: ArrowDownNarrowWide },
    { value: 'antigos', label: 'Mais antigos', icon: ArrowUpNarrowWide },
]
const REVIEWED_OPTIONS = [
    { value: 'todos', label: 'Todos', icon: ListChecks },
    { value: 'nao', label: 'Não revisados', icon: Clock },
    { value: 'sim', label: 'Revisados', icon: CircleCheck },
]

export function ApprovalList() {
    const queryClient = useQueryClient()
    const [review, setReview] = useState(null)
    const [feedback, setFeedback] = useFeedback()
    const [processingId, setProcessingId] = useState(null)
    const [query, setQuery] = useState('')
    const [submitter, setSubmitter] = useState('todos')
    const [type, setType] = useState('todos')
    const [sort, setSort] = useState('recentes')
    const [reviewed, setReviewed] = useState('todos')

    // Busca + filtro/ordenação no hook: a lista vem já filtrada (visible) e a
    // completa (all) serve para a contagem de pendentes.
    const { all, visible } = useFilteredApprovals({ query, submitter, type, reviewed, sort })

    async function decide(item, approved, comment) {
        if (processingId === item.id) return
        setProcessingId(item.id)
        try {
            await moderateApproval({ id: item.id, type: item.type, approved, comment })
            if (comment) {
                await addModerationComment({ targetId: item.id, type: item.type, comment })
            }
            await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.approvals })
            setReview(null)
            setFeedback(`${approved ? 'Aprovado' : 'Rejeitado'}: ${item.title}`)
        } finally {
            setProcessingId(null)
        }
    }

    const pendingCount = all.filter((item) => !item.reviewed).length

    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-secondary font-montserrat text-xl font-extrabold">
                    Solicitações
                </h2>
                <span className="bg-primary text-secondary rounded-full px-2.5 py-0.5 text-sm font-bold">
                    {pendingCount} pendentes
                </span>
            </div>

            {/* Busca (encolhe) + filtros à direita, na mesma linha. O filtro de
                revisado ("Todos") fica por último. */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="border-secondary/20 flex min-w-48 flex-1 items-center gap-2 rounded-full border-2 px-4 py-2">
                    <Search className="text-secondary/50 size-5" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Buscar por título ou solicitante"
                        className="text-secondary placeholder:text-secondary/50 w-full bg-transparent outline-none"
                    />
                </div>
                <FilterSelect
                    value={submitter}
                    onChange={setSubmitter}
                    options={SUBMITTER_OPTIONS}
                />
                <FilterSelect value={type} onChange={setType} options={TYPE_OPTIONS} />
                <FilterSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />
                <FilterSelect value={reviewed} onChange={setReviewed} options={REVIEWED_OPTIONS} />
            </div>

            {feedback && (
                <p className="animate-fade-in rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    {feedback}
                </p>
            )}

            {visible.length === 0 ? (
                <p className="text-secondary/60 py-8 text-center text-sm">
                    Nenhuma solicitação encontrada.
                </p>
            ) : (
                <ul className="flex flex-col gap-3">
                    {visible.map((item) => (
                        <ApprovalCard
                            key={item.id}
                            item={item}
                            disabled={processingId === item.id}
                            onReview={() => setReview(item)}
                            onApprove={() => decide(item, true, '')}
                            onReject={() => decide(item, false, '')}
                        />
                    ))}
                </ul>
            )}

            <ModerationModal item={review} onClose={() => setReview(null)} onDecide={decide} />
        </section>
    )
}
