// Filtro/ordenação das solicitações de moderação, separado da tela. Reaproveita o
// useAdminApprovals (useSuspenseQuery), então suspende junto. Recebe o estado dos
// filtros e devolve { all, visible }: a lista completa (p/ a contagem de pendentes)
// e a lista já filtrada + ordenada.

import { useMemo } from 'react'

import { useAdminApprovals } from '@/features/admin/hooks/useAdminData'

export function useFilteredApprovals({ query, submitter, type, reviewed, sort }) {
    const { data: all } = useAdminApprovals()

    const visible = useMemo(() => {
        const term = query.trim().toLowerCase()
        const out = all.filter(
            (item) =>
                (submitter === 'todos' || item.submitterType === submitter) &&
                (type === 'todos' || item.type === type) &&
                (reviewed === 'todos' || (reviewed === 'sim' ? item.reviewed : !item.reviewed)) &&
                (term === '' ||
                    item.title.toLowerCase().includes(term) ||
                    (item.submittedBy || '').toLowerCase().includes(term)),
        )
        out.sort((a, b) =>
            sort === 'recentes' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
        )
        return out
    }, [all, query, submitter, type, reviewed, sort])

    return { all, visible }
}
