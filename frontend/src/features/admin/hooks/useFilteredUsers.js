// Filtro/ordenação dos usuários, separado da tela. Reaproveita o useAdminUsers
// (useSuspenseQuery), então suspende junto. Recebe o estado dos filtros e devolve
// { all, visible }: a lista completa (p/ o total) e a lista já filtrada + ordenada.

import { useMemo } from 'react'

import { useAdminUsers } from '@/features/admin/hooks/useAdminData'

export function useFilteredUsers({ query, role, status, sort }) {
    const { data: all } = useAdminUsers()

    const visible = useMemo(() => {
        const term = query.trim().toLowerCase()
        return all
            .filter(
                (user) =>
                    (role === 'todos' || user.role === role) &&
                    (status === 'todos' || user.status === status) &&
                    (term === '' ||
                        user.name.toLowerCase().includes(term) ||
                        user.email.toLowerCase().includes(term)),
            )
            .sort((a, b) => (sort === 'recentes' ? b.id - a.id : a.id - b.id))
    }, [all, query, role, status, sort])

    return { all, visible }
}
