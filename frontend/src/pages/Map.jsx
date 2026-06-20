// Mapa interativo em tela cheia (desktop): mapa expandido, cabeçalho sempre
// visível, filtros (à direita) + lista lateral (à esquerda), zoom + localização,
// detalhe do item (cartão no desktop / gaveta no mobile) e "sugerir ponto".
//
// A REGRA de "quem aparece no mapa" fica no hook useMapMarkers. A página NÃO conhece
// a biblioteca de mapa: ela conversa com um CONTROLADOR (flyTo/zoomIn/zoomOut) que o
// InnovationMap entrega — ver o "contrato" no topo de InnovationMap.jsx.

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Header } from '@/components/layout/Header'
import { useEventFilters } from '@/contexts/EventFiltersContext'
import { InnovationMap } from '@/features/map/components/InnovationMap'
import { MapDetailCard } from '@/features/map/components/MapDetailCard'
import { MapDetailSheet } from '@/features/map/components/MapDetailSheet'
import { MapError, MapSkeleton } from '@/features/map/components/MapFallbacks'
import { MapFilters } from '@/features/map/components/MapFilters'
import { MapMobileSheet } from '@/features/map/components/MapMobileSheet'
import { MapSidePanel } from '@/features/map/components/MapSidePanel'
import { MapZoomControls } from '@/features/map/components/MapZoomControls'
import { SuggestPointModal } from '@/features/map/components/SuggestPointModal'
import { useMapMarkers } from '@/features/map/hooks/useMapMarkers'
import { ATOR_TYPES } from '@/lib/atorTypes'

const ALL_TYPE_IDS = ATOR_TYPES.map((type) => type.id)

function MapContent() {
    // Controlador do mapa (interface estável): { flyTo, zoomIn, zoomOut }. Vem do
    // InnovationMap quando o mapa está pronto; a página nunca toca o Leaflet direto.
    const [mapController, setMapController] = useState(null)

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
    // Busca "ao digitar": estado único aplicado direto no filtro (sem precisar
    // confirmar), como nos catálogos. O form de busca só faz preventDefault.
    const [search, setSearch] = useState('')
    // Filtro de eventos por data/período no painel do mapa: { from, to } em ISO
    // (null = sem limite). Independente do filtro de data da tela de Eventos.
    const [eventRange, setEventRange] = useState({ from: null, to: null })

    // Busca + regra de "quem aparece no mapa" (já com a cor do marcador) no hook.
    const { actors, events, visibleActors, visibleEvents } = useMapMarkers({
        showActors,
        showEvents,
        enabledTypes,
        enabledCats,
        searchTerm: search,
        eventRange,
    })

    const selectedItem = !selected
        ? null
        : selected.type === 'ator'
          ? actors.find((actor) => actor.id === selected.id)
          : events.find((event) => event.id === selected.id)

    // Centraliza o mapa num item — via CONTROLADOR (interface estável), nunca
    // chamando o Leaflet direto.
    function focus(type, item) {
        setSelected({ type, id: item.id })
        mapController?.flyTo(item.position, 16)
    }

    function locate() {
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            (position) => {
                mapController?.flyTo([position.coords.latitude, position.coords.longitude], 15)
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
        searchDraft: search,
        onSearchChange: setSearch,
        onSearchSubmit: () => {},
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
                    onReady={setMapController}
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
                    onZoomIn={() => mapController?.zoomIn()}
                    onZoomOut={() => mapController?.zoomOut()}
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

// Página do Mapa (tela cheia): React Query + Suspense (loading via MapSkeleton) +
// ErrorBoundary próprio (com "tentar novamente"). A navbar (Header) fica FORA do
// Suspense, então continua visível enquanto a área do mapa carrega.
//
// ⚠️ O Mapa MANTÉM o boundary próprio (não usa o erro central do MainLayout):
// /map é uma rota STANDALONE, fora do MainLayout (ver AppRoutes), então o
// RouteError central não a cobre.
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
