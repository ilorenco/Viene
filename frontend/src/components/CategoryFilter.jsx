import useEmblaCarousel from 'embla-carousel-react'

import { cn } from '@/lib/utils'

export function CategoryFilter({ value, onChange, options }) {
    const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true })

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="font-montserrat flex gap-2 text-xs font-extrabold">
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
            </div>
        </div>
    )
}
