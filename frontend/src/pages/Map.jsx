// Mapa interativo em tela cheia (desktop): mapa expandido, cabeçalho sempre
// visível, filtros (à direita) + lista lateral (à esquerda), zoom + localização,
// detalhe do item (cartão no desktop / gaveta no mobile) e "sugerir ponto".

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense, useMemo, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Header } from '@/components/layout/Header'
import { useEventFilters } from '@/contexts/EventFiltersContext'
import { ACTOR_TYPES, colorForType } from '@/features/actors/mocks/actorTypes'
import { InnovationMap } from '@/features/map/components/InnovationMap'
import { MapDetailCard } from '@/features/map/components/MapDetailCard'
import { MapDetailSheet } from '@/features/map/components/MapDetailSheet'
import { MapError, MapSkeleton } from '@/features/map/components/MapFallbacks'
import { MapFilters } from '@/features/map/components/MapFilters'
import { MapMobileSheet } from '@/features/map/components/MapMobileSheet'
import { MapSidePanel } from '@/features/map/components/MapSidePanel'
import { MapZoomControls } from '@/features/map/components/MapZoomControls'
import { SuggestPointModal } from '@/features/map/components/SuggestPointModal'
import { useMapData } from '@/features/map/hooks/useMapData'

const ALL_TYPE_IDS = ACTOR_TYPES.map((type) => type.id)

function MapContent() {
    const [map, setMap] = useState(null)
    // Busca via React Query/Suspense (padrão do colega): atores e eventos vêm já
    // resolvidos, em paralelo. O loading sobe para o <Suspense> e o erro para o
    // <ErrorBoundary> definidos no wrapper Map() abaixo.
    const { actors: actorsRaw, events: eventsRaw } = useMapData()

    const [showActors, setShowActors] = useState(true)
    const [showEvents, setShowEvents] = useState(true)
    const [enabledTypes, setEnabledTypes] = useState(() => new Set(ALL_TYPE_IDS))
    const { selectedEventCategories: enabledCats, setSelectedEventCategories: setEnabledCats } =
        useEventFilters()
    const [selected, setSelected] = useState(null)
    const [suggestOpen, setSuggestOpen] = useState(false)
    const [hidePins, setHidePins] = useState(false)
    // Filtros começam minimizados ao abrir o mapa; o usuário expande quando quiser.
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [sheetExpanded, setSheetExpanded] = useState(false)
    const [searchDraft, setSearchDraft] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    // Filtro de eventos por data/período no painel do mapa: { from, to } em ISO
    // (null = sem limite). Independente do filtro de data da tela de Eventos.
    const [eventRange, setEventRange] = useState({ from: null, to: null })

    const actors = useMemo(
        () => (actorsRaw ?? []).map((actor) => ({ ...actor, color: colorForType(actor.type) })),
        [actorsRaw],
    )
    const events = useMemo(() => eventsRaw ?? [], [eventsRaw])

    const visibleActors = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        return showActors
            ? actors.filter(
                  (actor) =>
                      enabledTypes.has(actor.type) &&
                      (term === '' || actor.name.toLowerCase().includes(term)),
              )
            : []
    }, [actors, showActors, enabledTypes, searchTerm])

    const visibleEvents = useMemo(() => {
        const term = searchTerm.trim().toLowerCase()
        return showEvents
            ? events.filter(
                  (event) =>
                      enabledCats.has(event.category) &&
                      (term === '' || event.title.toLowerCase().includes(term)) &&
                      (!eventRange.from || event.date >= eventRange.from) &&
                      (!eventRange.to || event.date <= eventRange.to),
              )
            : []
    }, [events, showEvents, enabledCats, searchTerm, eventRange])

    const selectedItem = !selected
        ? null
        : selected.type === 'ator'
          ? actors.find((actor) => actor.id === selected.id)
          : events.find((event) => event.id === selected.id)

    function focus(type, item) {
        setSelected({ type, id: item.id })
        if (map) map.flyTo(item.position, 16, { duration: 0.8 })
    }

    function locate() {
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (map) map.flyTo([position.coords.latitude, position.coords.longitude], 15)
            },
            () => {},
            { timeout: 10000 },
        )
    }

    const filterProps = {
        showActors,
        setShowActors,
        showEvents,
        setShowEvents,
        enabledTypes,
        setEnabledTypes,
        enabledCats,
        setEnabledCats,
        events,
        eventRange,
        setEventRange,
        onSuggest: () => setSuggestOpen(true),
        hidePins,
        onTogglePins: () => setHidePins((value) => !value),
    }
    const listProps = {
        actors: visibleActors,
        events: visibleEvents,
        selected,
        onFocus: focus,
        searchDraft,
        onSearchChange: setSearchDraft,
        onSearchSubmit: () => setSearchTerm(searchDraft),
    }

    return (
        <>
            {/* Área do mapa: ocupa o restante da altura; os overlays se posicionam
                em relação a este container (logo abaixo da navbar). */}
            <div className="relative flex-1 overflow-hidden">
                <InnovationMap
                    actors={hidePins ? [] : visibleActors}
                    events={hidePins ? [] : visibleEvents}
                    selected={selected}
                    onSelect={setSelected}
                    onMapReady={setMap}
                />

                <MapFilters
                    {...filterProps}
                    open={filtersOpen}
                    onToggleOpen={() => setFiltersOpen((value) => !value)}
                />

                <MapSidePanel {...listProps} onSuggest={() => setSuggestOpen(true)} />

                <MapMobileSheet
                    filterProps={filterProps}
                    listProps={listProps}
                    expanded={sheetExpanded}
                    setExpanded={setSheetExpanded}
                />

                <MapZoomControls
                    onZoomIn={() => map?.zoomIn()}
                    onZoomOut={() => map?.zoomOut()}
                    onLocate={locate}
                    pinsHidden={hidePins}
                    onTogglePins={() => setHidePins((value) => !value)}
                />

                {selectedItem && (
                    <>
                        <MapDetailCard
                            key={`card-${selected.type}-${selected.id}`}
                            item={selectedItem}
                            type={selected.type}
                            onClose={() => setSelected(null)}
                        />
                        <MapDetailSheet
                            key={`sheet-${selected.type}-${selected.id}`}
                            item={selectedItem}
                            type={selected.type}
                            onClose={() => setSelected(null)}
                        />
                    </>
                )}
            </div>

            <SuggestPointModal open={suggestOpen} onClose={() => setSuggestOpen(false)} />
        </>
    )
}

// Página do Mapa (tela cheia): adota o padrão de conexão da branch do colega —
// React Query + Suspense (loading via MapSkeleton) + ErrorBoundary (com "tentar
// novamente"). A navbar (Header) fica FORA do Suspense, então continua visível
// enquanto a área do mapa carrega. Quem busca os dados (useMapData) e suspende
// enquanto carrega é o MapContent.
export function Map() {
    return (
        <div className="flex h-[100dvh] w-full flex-col overflow-hidden">
            <Header />
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary onReset={reset} FallbackComponent={MapError}>
                        <Suspense fallback={<MapSkeleton />}>
                            <MapContent />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        </div>
    )
}
