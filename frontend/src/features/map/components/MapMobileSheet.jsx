// Gaveta inferior do mapa (mobile): o usuário puxa para cima (ou toca na alça)
// e ela ocupa ~metade da tela, com abas de Filtros e Lista. Some no desktop.
// Acima dela fica o botão "Solicitar marcador", que sobe junto com a gaveta.

import { MapPinPlus } from 'lucide-react'
import { useRef, useState } from 'react'

import { MapFilterControls } from '@/features/map/components/MapFilterControls'
import { MapItemList } from '@/features/map/components/MapItemList'
import { MapSearch } from '@/features/map/components/MapSearch'
import { cn } from '@/lib/utils'

// `expanded` e `setExpanded` vêm do Map.jsx (estado elevado) para que o cartão
// de detalhe suba junto quando a gaveta sobe, ficando sempre acima do botão.
export function MapMobileSheet({ filterProps, listProps, expanded, setExpanded }) {
    const [tab, setTab] = useState('filtros')
    const startRef = useRef(null)

    const total = listProps.actors.length + listProps.events.length

    function onPointerDown(event) {
        startRef.current = event.clientY
    }

    function onPointerUp(event) {
        if (startRef.current == null) return
        const delta = startRef.current - event.clientY
        if (delta > 24) setExpanded(true)
        else if (delta < -24) setExpanded(false)
        else setExpanded((value) => !value)
        startRef.current = null
    }

    function handleFocus(type, item) {
        listProps.onFocus(type, item)
        setExpanded(false)
    }

    return (
        <div
            className={cn(
                'bg-background absolute inset-x-0 bottom-0 z-[1000] flex flex-col rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-[height] duration-300 lg:hidden',
                expanded ? 'h-[55vh]' : 'h-14',
            )}
        >
            {/* Botão de solicitar marcador (sobe junto com a gaveta) */}
            <button
                type="button"
                onClick={filterProps.onSuggest}
                className="bg-primary text-secondary absolute -top-16 left-4 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold shadow-lg transition active:scale-95"
            >
                <MapPinPlus className="size-5" />
                Solicitar marcador
            </button>

            <button
                type="button"
                aria-expanded={expanded}
                aria-label="Filtros e lista"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                className="flex shrink-0 cursor-grab touch-none flex-col items-center gap-1 py-2 select-none"
            >
                <span className="bg-secondary/30 h-1.5 w-12 rounded-full" />
                <span className="text-secondary text-sm font-semibold">
                    Filtros e lista{!expanded && total ? ` (${total})` : ''}
                </span>
            </button>

            {expanded && (
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex gap-2 px-3 pb-2">
                        <button
                            type="button"
                            onClick={() => setTab('filtros')}
                            className={cn(
                                'flex-1 rounded-full px-3 py-1.5 text-sm font-semibold',
                                tab === 'filtros'
                                    ? 'bg-primary text-secondary'
                                    : 'bg-secondary/10 text-secondary',
                            )}
                        >
                            Filtros
                        </button>
                        <button
                            type="button"
                            onClick={() => setTab('lista')}
                            className={cn(
                                'flex-1 rounded-full px-3 py-1.5 text-sm font-semibold',
                                tab === 'lista'
                                    ? 'bg-primary text-secondary'
                                    : 'bg-secondary/10 text-secondary',
                            )}
                        >
                            Lista ({total})
                        </button>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
                        {tab === 'filtros' ? (
                            <MapFilterControls {...filterProps} />
                        ) : (
                            <div className="flex flex-col gap-2">
                                <MapSearch
                                    value={listProps.searchDraft}
                                    onChange={listProps.onSearchChange}
                                    onSubmit={listProps.onSearchSubmit}
                                />
                                <MapItemList
                                    actors={listProps.actors}
                                    events={listProps.events}
                                    selected={listProps.selected}
                                    onFocus={handleFocus}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
