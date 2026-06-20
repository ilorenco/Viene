import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { SearchBar } from '@/components/ui/SearchBar'
import { useEventFilters } from '@/contexts/EventFiltersContext'
import { EventDateFilter } from '@/features/events/components/EventDateFilter'
import { EventList } from '@/features/events/components/EventList'
import { EventsError, EventsSkeleton } from '@/features/events/components/EventsFallbacks'
import { useEvents } from '@/features/events/hooks/useEvents'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'

// "Todos" + as categorias. As pílulas e o filtro compartilhado (Set) controlam
// o mesmo estado, então a seleção fica sincronizada com o Mapa.
const TYPE_OPTIONS = [{ value: 'todas', label: 'Todos' }, ...mockEventCategories]
const ALL_CATEGORY_VALUES = mockEventCategories.map((category) => category.value)

function EventsContent() {
    const { data: events } = useEvents()
    const { selectedEventCategories: selected, setSelectedEventCategories: setSelected } =
        useEventFilters()
    const [search, setSearch] = useState('')
    // Filtro por data/período: { from, to } em ISO (null = sem limite).
    const [period, setPeriod] = useState({ from: null, to: null })

    // Categoria (single-select) sobre o filtro compartilhado (Set): 'todas' = todas.
    const categoryValue = selected.size === 1 ? [...selected][0] : 'todas'

    function selectCategory(value) {
        setSelected(value === 'todas' ? new Set(ALL_CATEGORY_VALUES) : new Set([value]))
    }

    const term = search.trim().toLowerCase()
    const filtered = (events ?? []).filter(
        (event) =>
            selected.has(event.category) &&
            (term === '' ||
                event.title.toLowerCase().includes(term) ||
                (event.address || '').toLowerCase().includes(term)) &&
            (!period.from || event.date >= period.from) &&
            (!period.to || event.date <= period.to),
    )

    return (
        <>
            <PageBanner>
                <PageHeader title="Encontre Eventos" className="text-white" rule={false} />

                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Busque por nome, local ou instituição"
                />

                <CategoryFilter
                    value={categoryValue}
                    onChange={selectCategory}
                    options={TYPE_OPTIONS}
                />
            </PageBanner>

            <div className="flex flex-wrap items-center gap-2">
                <EventDateFilter events={events ?? []} value={period} onChange={setPeriod} />
            </div>

            <EventList events={filtered} />
        </>
    )
}

// Página de Eventos: React Query + Suspense (loading via Skeleton) + ErrorBoundary
// (com "tentar novamente"). Quem busca os dados (useEvents) e suspende é o
// EventsContent. Suspense de página inteira (o filtro de data depende dos dados).
export function Events() {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary onReset={reset} FallbackComponent={EventsError}>
                    <Suspense fallback={<EventsSkeleton />}>
                        <EventsContent />
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    )
}
