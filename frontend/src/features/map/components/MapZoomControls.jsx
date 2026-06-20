// Controles do mapa: ocultar/mostrar pinos, minha localização e zoom (+/−).
// No desktop ficam mais embaixo (lg:bottom-6) para não colidir com o botão de
// acessibilidade, que fica no meio da borda direita.

import { Crosshair, Eye, EyeOff, Minus, Plus } from 'lucide-react'

export function MapZoomControls({ onZoomIn, onZoomOut, onLocate, pinsHidden, onTogglePins }) {
    return (
        <div className="absolute right-3 bottom-24 z-[1000] flex flex-col gap-2 lg:bottom-6 lg:origin-bottom-right lg:scale-90">
            <button
                type="button"
                onClick={onTogglePins}
                aria-label={pinsHidden ? 'Mostrar pinos' : 'Ocultar pinos'}
                title={pinsHidden ? 'Mostrar pinos' : 'Ocultar pinos'}
                className="bg-background text-secondary rounded-full p-2.5 shadow-lg transition active:scale-90"
            >
                {pinsHidden ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </button>

            <button
                type="button"
                onClick={onLocate}
                aria-label="Minha localização"
                className="bg-background text-secondary rounded-full p-2.5 shadow-lg transition active:scale-90"
            >
                <Crosshair className="size-5" />
            </button>

            <div className="bg-background flex flex-col overflow-hidden rounded-full shadow-lg">
                <button
                    type="button"
                    onClick={onZoomIn}
                    aria-label="Aproximar"
                    className="text-secondary p-2.5 transition active:scale-90"
                >
                    <Plus className="size-5" />
                </button>
                <span className="bg-secondary/10 h-px" />
                <button
                    type="button"
                    onClick={onZoomOut}
                    aria-label="Afastar"
                    className="text-secondary p-2.5 transition active:scale-90"
                >
                    <Minus className="size-5" />
                </button>
            </div>
        </div>
    )
}
