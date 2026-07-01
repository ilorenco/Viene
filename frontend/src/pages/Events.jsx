import { CalendarPlus, Search, Tag } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PageHeader } from '@/components/layout/PageHeader'
import { DraggableTrack } from '@/components/ui/DraggableTrack'
import { Pagination } from '@/components/ui/Pagination'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Select'
import { useEventFilters } from '@/contexts/EventFiltersContext'
import { EventDateFilter } from '@/features/events/components/EventDateFilter'
import { EventList } from '@/features/events/components/EventList'
import { EventsSkeleton } from '@/features/events/components/EventsFallbacks'
import { RegisterEventModal } from '@/features/events/components/RegisterEventModal'
import { useFilteredEvents } from '@/features/events/hooks/useFilteredEvents'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { useGridColumns } from '@/hooks/useGridColumns'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'

// Tipos de evento: "Todos" + as categorias. Usado tanto no carrossel (mobile)
// quanto no dropdown "Todas as Tags" — os dois controlam o mesmo filtro.
const TYPE_OPTIONS = [{ value: 'todas', label: 'Todos' }, ...mockEventCategories]
const ALL_CATEGORY_VALUES = mockEventCategories.map((category) => category.value)

function EventsContent() {
    const location = useLocation()
    const navigate = useNavigate()
    const { selectedEventCategories: selected, setSelectedEventCategories: setSelected } =
        useEventFilters()
    const [query, setQuery] = useState('')
    // Filtro por data/período: { from, to } em ISO (null = sem limite).
    const [period, setPeriod] = useState({ from: null, to: null })
    // Abre o modal de cadastro já aberto quando se chega aqui pelo atalho do
    // Perfil (state.openRegister — ver Profile.jsx). Limpa o state na hora pra
    // um back/forward do navegador não reabrir o modal sozinho.
    const [registerOpen, setRegisterOpen] = useState(() => Boolean(location.state?.openRegister))
    useEffect(() => {
        if (location.state?.openRegister) {
            navigate(location.pathname, { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- só na primeira renderização (consome o state uma vez)
    }, [])

    // Busca + regra de filtro ficam no hook (useSuspenseQuery por dentro): a página
    // recebe a lista já filtrada (filtered) e a lista completa (all), esta última
    // necessária para o EventDateFilter montar o calendário.
    const { items: filtered, all } = useFilteredEvents(selected, query, period)

    // Categoria (single-select) sobre o filtro compartilhado (Set): 'todas' = todas
    // as categorias; ou uma só. O carrossel (mobile) e o dropdown "Todas as Tags"
    // controlam o mesmo estado, então ficam sincronizados.
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

    // Paginação: 3 linhas cheias, acompanhando o nº de colunas responsivo do grid
    // (1/2/3/4 conforme a largura, como em Atores). Cada página/subguia enche o
    // máximo possível; a última tem o que sobrar.
    const columns = useGridColumns()
    const { page, setPage, totalPages, pageItems } = usePagination(filtered, {
        pageSize: columns * 3,
        resetKey: `${query}|${[...selected].sort().join(',')}|${period.from}|${period.to}`,
    })

    // Botão de um TIPO no carrossel do banner (mobile), como na tela de Atores.
    function renderTypeButton(option) {
        return (
            <button
                key={option.value}
                type="button"
                onClick={() => selectCategory(option.value)}
                aria-pressed={categoryValue === option.value}
                className={cn(
                    'shrink-0 rounded-lg px-2.5 py-2.5 text-xs font-bold transition active:scale-95',
                    categoryValue === option.value
                        ? 'bg-primary text-secondary'
                        : 'text-secondary bg-white',
                )}
            >
                {option.label}
            </button>
        )
    }

    return (
        <>
            {/* Banner escuro no estilo da página de Atores: vai de canto a canto no
                mobile; ~5% das bordas e cantos arredondados no desktop. À esquerda,
                título; à direita, busca + (no mobile) carrossel de tipos de evento.
                No mobile, -mt-24 cancela o pt do <main> por completo (banner
                colado no header, igual às telas de detalhe); no desktop,
                lg:-mt-12 deixa metade do respiro da Home. */}
            <div className="bg-secondary -mx-6 -mt-24 flex flex-col gap-6 rounded-none p-6 lg:-mx-[5vw] lg:-mt-12 lg:flex-row lg:items-start lg:justify-between lg:rounded-xl lg:p-8">
                <div className="flex flex-col gap-3 lg:max-w-sm">
                    {/* Mobile: título curto + linha. Desktop: título + subtítulo. */}
                    <PageHeader title="Encontre Eventos" className="text-white lg:hidden" />
                    <div className="hidden flex-col gap-3 lg:flex">
                        <h1 className="font-montserrat text-3xl leading-tight font-extrabold text-white lg:text-4xl">
                            Encontre Eventos
                        </h1>
                        <p className="text-sm text-white/60">
                            Explore encontros, palestras, pitch days e experiências conectadas ao
                            ecossistema do Viene.
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
                            aria-label="Buscar eventos"
                            className="text-secondary placeholder:text-secondary/50 w-full bg-transparent outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-secondary shrink-0 rounded-full px-5 py-1.5 text-sm font-bold transition active:scale-95 lg:py-2"
                        >
                            Buscar
                        </button>
                    </form>

                    {/* Mobile: carrossel arrastável com os tipos de evento. */}
                    <div className="lg:hidden">
                        <DraggableTrack className="gap-3">
                            {TYPE_OPTIONS.map(renderTypeButton)}
                        </DraggableTrack>
                    </div>
                </div>
            </div>

            {/* Barra de filtros: dropdown "Todas as Tags" + datas. No mobile, os
                botões têm ícone ao lado e texto em 2 linhas (mais compactos). */}
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

                <button
                    type="button"
                    onClick={() => setRegisterOpen(true)}
                    className="bg-primary text-secondary flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-bold shadow transition active:scale-95 lg:ml-auto lg:gap-2 lg:px-4 lg:text-sm"
                >
                    <CalendarPlus className="size-5 shrink-0" />
                    <span className="leading-tight">Cadastrar evento</span>
                </button>
            </div>

            <EventList events={pageItems} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />

            <RegisterEventModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
        </>
    )
}

// Página de Eventos: adota o padrão de conexão da branch do colega — React Query
// + Suspense (loading via Skeleton). O erro é tratado de forma CENTRAL no
// MainLayout (RouteError), então a página só precisa do <Suspense>. Suspense de
// página inteira (o filtro de data tem o calendário acoplado aos dados), no mesmo
// modelo do catálogo de atores. Quem busca os dados (useFilteredEvents → useEvents)
// e suspende é o EventsContent.
export function Events() {
    return (
        <Suspense fallback={<EventsSkeleton />}>
            <EventsContent />
        </Suspense>
    )
}
