// Lista lateral dos itens visíveis (desktop), com busca. Fica à ESQUERDA da tela
// (trocou de lado com os filtros). Pode ser minimizada. Deixa ~10% no rodapé.
//
// Ao lado dela fica o botão "Solicitar marcador": ele é posicionado com `left-full`
// (colado à direita do painel), então acompanha sozinho a largura — quando a lista
// é minimizada (botão estreito) ele vai para a esquerda; quando expandida (painel
// largo) vai para a direita. O container externo é transparente a cliques
// (`pointer-events-none`) e só os botões/painel capturam o clique, para não
// bloquear o mapa atrás.

import { ChevronLeft, List, MapPinPlus } from 'lucide-react'
import { useState } from 'react'

import { MapItemList } from '@/features/map/components/MapItemList'
import { MapSearch } from '@/features/map/components/MapSearch'

export function MapSidePanel({
    actors,
    events,
    selected,
    onFocus,
    searchDraft,
    onSearchChange,
    onSearchSubmit,
    onSuggest,
}) {
    const [open, setOpen] = useState(true)
    const total = actors.length + events.length

    return (
        <div className="pointer-events-none absolute top-3 bottom-[3%] left-3 z-[1000] hidden lg:block">
            {open ? (
                <aside className="bg-background/95 pointer-events-auto flex h-full w-64 flex-col overflow-hidden rounded-2xl shadow-lg backdrop-blur transition-all duration-300">
                    <header className="border-secondary/10 flex items-center justify-between gap-2 border-b p-3">
                        <h2 className="text-secondary font-montserrat font-extrabold">
                            No mapa ({total})
                        </h2>
                        <button
                            type="button"
                            aria-label="Minimizar lista"
                            title="Minimizar lista"
                            onClick={() => setOpen(false)}
                            className="text-secondary transition active:scale-90"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                    </header>

                    <div className="border-secondary/10 border-b p-2">
                        <MapSearch
                            value={searchDraft}
                            onChange={onSearchChange}
                            onSubmit={onSearchSubmit}
                        />
                    </div>

                    <div className="viene-scrollbar flex-1 overflow-y-auto p-2">
                        <MapItemList
                            actors={actors}
                            events={events}
                            selected={selected}
                            onFocus={onFocus}
                        />
                    </div>
                </aside>
            ) : (
                // Minimizada: vira um botão compacto que reabre a lista.
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="bg-background/95 text-secondary font-montserrat pointer-events-auto flex items-center gap-2 rounded-2xl px-3 py-2 font-extrabold shadow-lg backdrop-blur transition-all duration-300"
                >
                    <List className="text-primary size-5" />
                    No mapa ({total})
                </button>
            )}

            {/* Botão "Solicitar marcador" colado à direita do painel (acompanha a
                largura via left-full). ~20% menor que o antigo botão dos filtros:
                ícone size-4 (era size-5) e texto text-sm. */}
            <button
                type="button"
                onClick={onSuggest}
                className="bg-primary text-secondary pointer-events-auto absolute top-0 left-full ml-2 flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold whitespace-nowrap shadow-lg transition active:scale-95"
            >
                <MapPinPlus className="size-4" />
                Solicitar marcador
            </button>
        </div>
    )
}
