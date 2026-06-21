// Painel "Eventos" da tela de Favoritos. Reaproveita exatamente os filtros do
// catálogo de eventos (categoria + período via EventDateFilter), os mesmos cards
// (EventList) e a mesma paginação. A busca vem de cima (digitada no banner) por
// prop `search`. O filtro de categoria é LOCAL (não usa o contexto compartilhado
// do catálogo/mapa) para não acoplar os favoritos às outras telas.

import { Tag } from 'lucide-react'
import { useState } from 'react'

import { Pagination } from '@/components/ui/Pagination'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Select'
import { EventDateFilter } from '@/features/events/components/EventDateFilter'
import { EventList } from '@/features/events/components/EventList'
import { useFilteredFavoriteEvents } from '@/features/events/hooks/useFilteredEvents'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { usePagination } from '@/hooks/usePagination'

const ALL_CATEGORY_VALUES = mockEventCategories.map((category) => category.value)

export function FavoriteEventsPanel({ search }) {
    // Categoria (single-select sobre um Set, igual ao catálogo) e período (datas).
    const [selected, setSelected] = useState(() => new Set(ALL_CATEGORY_VALUES))
    const [period, setPeriod] = useState({ from: null, to: null })

    const { items: filtered, all } = useFilteredFavoriteEvents(selected, search, period)

    const categoryValue = selected.size === 1 ? [...selected][0] : 'todas'
    const categoryLabel =
        categoryValue === 'todas'
            ? 'Todas as Tags'
            : (mockEventCategories.find((category) => category.value === categoryValue)?.label ??
              'Categoria')

    function selectCategory(value) {
        setSelected(value === 'todas' ? new Set(ALL_CATEGORY_VALUES) : new Set([value]))
    }

    const { page, setPage, totalPages, pageItems } = usePagination(filtered, {
        pageSize: 6,
        resetKey: `${search}|${[...selected].sort().join(',')}|${period.from}|${period.to}`,
    })

    return (
        <>
            {/* Mesmos filtros do catálogo de eventos: "Todas as Tags" + data. */}
            <div className="flex flex-wrap items-center gap-2">
                <Select value={categoryValue} onValueChange={selectCategory}>
                    <SelectTrigger className="text-secondary border-secondary/15 bg-background gap-1.5 rounded-full border px-2 py-1.5 text-xs font-semibold lg:gap-2 lg:px-4 lg:py-2 lg:text-sm">
                        <Tag className="text-primary size-4 shrink-0" />
                        <span className="max-w-32 truncate leading-tight lg:max-w-none">
                            {categoryLabel}
                        </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                        <SelectItem value="todas">Todas as Tags</SelectItem>
                        {mockEventCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                                {category.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <EventDateFilter events={all} value={period} onChange={setPeriod} />
            </div>

            {pageItems.length > 0 ? (
                <EventList events={pageItems} />
            ) : (
                <p className="text-secondary/60 rounded-2xl bg-white p-6 text-center text-sm">
                    Nenhum evento favoritado encontrado para esse filtro.
                </p>
            )}
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
    )
}
