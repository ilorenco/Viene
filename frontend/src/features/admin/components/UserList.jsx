// Aba "Usuários": título + total, busca, filtros (tipo, estado, ordenação) e a
// lista com ações (Mais informações / Bloquear-Desbloquear / Excluir). A REGRA de
// filtro/ordenação fica no hook useFilteredUsers; aqui a tela só guarda o estado
// dos filtros, desenha e trata as mutações (que invalidam a query).

import { useQueryClient } from '@tanstack/react-query'
import {
    ArrowDownNarrowWide,
    ArrowUpNarrowWide,
    Ban,
    Building2,
    CircleCheck,
    CircleDot,
    Search,
    Shield,
    User,
    UserCog,
} from 'lucide-react'
import { useState } from 'react'

import { ConfirmDialog } from '@/features/admin/components/ConfirmDialog'
import { FilterSelect } from '@/features/admin/components/FilterSelect'
import { UserDetailsModal } from '@/features/admin/components/UserDetailsModal'
import { UserRow } from '@/features/admin/components/UserRow'
import { ADMIN_KEYS } from '@/features/admin/hooks/useAdminData'
import { useFilteredUsers } from '@/features/admin/hooks/useFilteredUsers'
import { deleteUser, toggleUserStatus } from '@/features/admin/services/admin'
import { useFeedback } from '@/hooks/useFeedback'

const ROLE_OPTIONS = [
    { value: 'todos', label: 'Tipo: todos', icon: UserCog },
    { value: 'admin', label: 'Administradores', icon: Shield },
    { value: 'ator', label: 'Atores', icon: Building2 },
    { value: 'usuario', label: 'Usuários', icon: User },
]
const STATUS_OPTIONS = [
    { value: 'todos', label: 'Estado: todos', icon: CircleDot },
    { value: 'ativo', label: 'Ativos', icon: CircleCheck },
    { value: 'bloqueado', label: 'Bloqueados', icon: Ban },
]
const SORT_OPTIONS = [
    { value: 'recentes', label: 'Mais recentes', icon: ArrowDownNarrowWide },
    { value: 'antigos', label: 'Mais antigos', icon: ArrowUpNarrowWide },
]

export function UserList() {
    const queryClient = useQueryClient()
    const [query, setQuery] = useState('')
    const [role, setRole] = useState('todos')
    const [status, setStatus] = useState('todos')
    const [sort, setSort] = useState('recentes')
    const [detail, setDetail] = useState(null)
    const [toDelete, setToDelete] = useState(null)
    const [feedback, setFeedback] = useFeedback()

    // Busca + filtro/ordenação no hook: a lista vem já filtrada (filtered) e a
    // completa (users) serve para o total.
    const { all: users, visible: filtered } = useFilteredUsers({ query, role, status, sort })

    async function handleDelete() {
        const user = toDelete
        await deleteUser(user.id)
        await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.users })
        setToDelete(null)
        setDetail(null)
        setFeedback(`Usuário "${user.name}" removido.`)
    }

    async function handleToggle(user) {
        const updated = await toggleUserStatus(user.id)
        await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.users })
        setFeedback(
            `Usuário "${user.name}" ${updated.status === 'bloqueado' ? 'bloqueado' : 'desbloqueado'}.`,
        )
    }

    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <h2 className="text-secondary font-montserrat text-xl font-extrabold">Usuários</h2>
                <span className="bg-secondary/10 text-secondary rounded-full px-2.5 py-0.5 text-sm font-bold">
                    {users.length}
                </span>
            </div>

            {/* Busca (encolhe) + filtros à direita, na mesma linha. */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="border-secondary/20 flex min-w-48 flex-1 items-center gap-2 rounded-full border-2 px-4 py-2">
                    <Search className="text-secondary/50 size-5" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Buscar por nome ou e-mail"
                        className="text-secondary placeholder:text-secondary/50 w-full bg-transparent outline-none"
                    />
                </div>
                <FilterSelect value={role} onChange={setRole} options={ROLE_OPTIONS} />
                <FilterSelect value={status} onChange={setStatus} options={STATUS_OPTIONS} />
                <FilterSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />
            </div>

            {feedback && (
                <p className="animate-fade-in rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    {feedback}
                </p>
            )}

            {filtered.length === 0 ? (
                <p className="text-secondary/60 py-8 text-center text-sm">
                    Nenhum usuário encontrado.
                </p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {filtered.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onDetails={() => setDetail(user)}
                            onToggleStatus={() => handleToggle(user)}
                            onDelete={() => setToDelete(user)}
                        />
                    ))}
                </ul>
            )}

            <UserDetailsModal
                user={detail}
                onClose={() => setDetail(null)}
                onDelete={(user) => {
                    setDetail(null)
                    setToDelete(user)
                }}
            />

            <ConfirmDialog
                open={Boolean(toDelete)}
                onOpenChange={(open) => {
                    if (!open) setToDelete(null)
                }}
                title="Excluir usuário"
                description={
                    toDelete
                        ? `Tem certeza que deseja excluir "${toDelete.name}"? Esta ação não pode ser desfeita.`
                        : ''
                }
                confirmLabel="Excluir"
                onConfirm={handleDelete}
            />
        </section>
    )
}
