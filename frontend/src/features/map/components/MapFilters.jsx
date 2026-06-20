// Painel de filtros do mapa (desktop). Fica à DIREITA da tela, abaixo do
// cabeçalho. Começa minimizado; quando aberto, vai até ~10% do rodapé.

import { ChevronDown, SlidersHorizontal } from 'lucide-react'

import { MapFilterControls } from '@/features/map/components/MapFilterControls'
import { cn } from '@/lib/utils'

// `open` e `onToggleOpen` vêm do Map.jsx (estado elevado).
export function MapFilters({ open, onToggleOpen, ...controlProps }) {
    return (
        <aside
            className={cn(
                'bg-background/95 absolute top-3 right-6 z-[1000] hidden w-64 max-w-[80vw] flex-col overflow-hidden rounded-2xl shadow-lg backdrop-blur transition-all duration-300 lg:flex',
                open && 'bottom-[3%]',
            )}
        >
            <button
                type="button"
                onClick={onToggleOpen}
                className={cn(
                    'text-secondary font-montserrat flex shrink-0 items-center justify-between gap-2 px-3 font-extrabold',
                    // Minimizado: barra mais baixa (py menor). Aberto: mantém o
                    // respiro do cabeçalho (py-3).
                    open ? 'py-3' : 'py-2',
                )}
            >
                <span className="flex items-center gap-2">
                    <SlidersHorizontal className="text-primary size-5" />
                    Filtros
                </span>
                <ChevronDown className={cn('size-5 transition-transform', open && 'rotate-180')} />
            </button>

            {open && (
                <div className="viene-scrollbar flex-1 overflow-y-auto px-3 pb-3">
                    <MapFilterControls {...controlProps} />
                </div>
            )}
        </aside>
    )
}
