import { cn } from '@/lib/utils'

export function Tabs({ value, onChange, options }) {
    return (
        <div
            role="tablist"
            className="bg-secondary text-background flex overflow-hidden rounded-lg"
        >
            {options.map((option) => {
                const isActive = value === option.value
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(option.value)}
                        className="flex flex-1 flex-col items-center gap-2 pt-2"
                    >
                        <span className="text-2xl">{option.label}</span>
                        <span
                            aria-hidden="true"
                            className={cn(
                                'h-2 w-full rounded-full',
                                isActive ? 'bg-primary' : 'bg-transparent',
                            )}
                        />
                    </button>
                )
            })}
        </div>
    )
}
