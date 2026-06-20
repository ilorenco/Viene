// Tipos de evento em uma única linha rolável (arrastável para o lado), com
// multi-seleção. A seleção é compartilhada com o Mapa.

import { DraggableTrack } from '@/components/ui/DraggableTrack'
import { cn } from '@/lib/utils'

export function EventTypeChips({ options, selected, onToggle }) {
    return (
        <DraggableTrack className="font-montserrat gap-2 text-xs font-extrabold">
            {options.map((option) => {
                const active = selected.has(option.value)
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onToggle(option.value)}
                        aria-pressed={active}
                        className={cn(
                            'shrink-0 rounded-md p-1.5',
                            active ? 'bg-primary text-secondary' : 'bg-background text-secondary',
                        )}
                    >
                        {option.label}
                    </button>
                )
            })}
        </DraggableTrack>
    )
}
