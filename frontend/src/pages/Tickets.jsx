// Ingressos. Estrutura no padrão da página de Eventos: banner escuro com título +
// busca e uma barra de filtros (categoria + período), com um botão "Alertas" à
// direita que avisa sobre os eventos que estão chegando. Só a LISTA busca dados
// (useFilteredEvents -> useEvents, via <Suspense>); o erro é central no MainLayout.

import { Search, Tag } from 'lucide-react'
import { Suspense, useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Select'
import { EventDateFilter } from '@/features/events/components/EventDateFilter'
import { EventList } from '@/features/events/components/EventList'
import { EventsSkeleton } from '@/features/events/components/EventsFallbacks'
import { useFilteredEvents } from '@/features/events/hooks/useFilteredEvents'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { TicketAlerts } from '@/features/tickets/components/TicketAlerts'
import { usePagination } from '@/hooks/usePagination'

const ALL_CATEGORY_VALUES = mockEventCategories.map((category) => category.value)

function TicketsContent() {
    // Categoria (single-select sobre um Set, igual ao catálogo de eventos), busca e
    // período. O filtro é LOCAL (não usa o contexto compartilhado com Eventos/Mapa).
    const [selected, setSelected] = useState(() => new Set(ALL_CATEGORY_VALUES))
    const [query, setQuery] = useState('')
    const [period, setPeriod] = useState({ from: null, to: null })

    const { items: filtered, all } = useFilteredEvents(selected, query, period)

    const categoryValue = selected.size === 1 ? [...selected][0] : 'todas'
    const categoryLabel =
        categoryValue === 'todas'
            ? 'Todas as Tags'
            : (mockEventCategories.find((category) => category.value === categoryValue)?.label ??
              'Categoria')

    function selectCategory(value) {
        setSelected(value === 'todas' ? new Set(ALL_CATEGORY_VALUES) : new Set([value]))
    }

    // Busca automática (atualiza ao digitar) — o submit só evita recarregar a página.
    function submitSearch(event) {
        event.preventDefault()
    }

    const { page, setPage, totalPages, pageItems } = usePagination(filtered, {
        pageSize: 6,
        resetKey: `${query}|${[...selected].sort().join(',')}|${period.from}|${period.to}`,
    })

    return (
        <>
            {/* Banner escuro no estilo da página de Eventos: título + descrição à
                esquerda, busca à direita. */}
            <div className="bg-secondary -mx-4 flex flex-col gap-6 rounded-none p-6 lg:-mx-[5vw] lg:flex-row lg:items-start lg:justify-between lg:rounded-xl lg:p-8">
                <div className="flex flex-col gap-3 lg:max-w-sm">
                    {/* Mobile: título + Alertas no canto superior direito. */}
                    <div className="flex items-center justify-between gap-3 lg:hidden">
                        <PageHeader title="Meus Ingressos" className="text-white" />
                        <TicketAlerts events={all} compact />
                    </div>
                    <div className="hidden flex-col gap-3 lg:flex">
                        <h1 className="font-montserrat text-3xl leading-tight font-extrabold whitespace-nowrap text-white lg:text-4xl">
                            Meus Ingressos
                        </h1>
                        <p className="text-sm text-white/60">
                            Acompanhe os eventos em que você tem ingresso e fique de olho nos que
                            estão chegando.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-[28rem]">
                    <form
                        onSubmit={submitSearch}
                        className="flex items-center gap-2 rounded-full bg-white py-1 pr-1 pl-4 lg:py-1.5 lg:pr-1.5"
                    >
                        <Search aria-hidden="true" className="text-primary size-5 shrink-0" />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Busque por nome, local ou instituição"
                            aria-label="Buscar ingressos"
                            className="text-secondary placeholder:text-secondary/50 w-full bg-transparent outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-secondary shrink-0 rounded-full px-5 py-1.5 text-sm font-bold transition active:scale-95 lg:py-2"
                        >
                            Buscar
                        </button>
                    </form>
                    {/* Desktop: Alertas abaixo da busca. */}
                    <div className="hidden justify-end lg:flex">
                        <TicketAlerts events={all} />
                    </div>
                </div>
            </div>

            {/* Barra de filtros (categoria + período). */}
            <div className="flex flex-wrap items-center gap-2">
                <Select value={categoryValue} onValueChange={selectCategory}>
                    <SelectTrigger className="text-secondary border-secondary/15 bg-background gap-1.5 rounded-full border px-2 py-1.5 text-xs font-semibold lg:gap-2 lg:px-4 lg:py-2 lg:text-sm [&>svg:last-of-type]:hidden lg:[&>svg:last-of-type]:block">
                        <Tag className="text-primary size-4 shrink-0" />
                        <span className="max-w-16 leading-tight lg:max-w-none lg:truncate">
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

            <EventList events={pageItems} showTicketButton />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
    )
}

// Página de Ingressos: adota o padrão do colega — React Query + Suspense (loading
// via Skeleton); o erro é central no MainLayout. Suspense de página inteira (o
// filtro de data tem o calendário acoplado aos dados), igual à página de Eventos.
export function Tickets() {
    return (
        <Suspense fallback={<EventsSkeleton />}>
            <TicketsContent />
        </Suspense>
    )
}
