import { DraggableTrack } from '@/components/ui/DraggableTrack'
import { cn } from '@/lib/utils'

export function CategoryFilter({ value, onChange, options }) {
    return (
        <DraggableTrack className="font-montserrat gap-2 text-xs font-extrabold">
            {options.map((option) => {
                const isSelected = value === option.value
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        aria-pressed={isSelected}
                        className={cn(
                            'text-secondary shrink-0 rounded-md p-1.5',
                            isSelected ? 'bg-primary' : 'bg-background',
                        )}
                    >
                        {option.label}
                    </button>
                )
            })}
        </DraggableTrack>
    )
}
