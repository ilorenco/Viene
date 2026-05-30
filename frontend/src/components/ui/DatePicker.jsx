import { cn } from '@/lib/utils'

export function DatePicker({ days, value, onChange }) {
    return (
        <div className="flex items-center gap-2">
            {days.map((day) => {
                const isSelected = value === day.date
                return (
                    <button
                        key={day.date}
                        type="button"
                        onClick={() => onChange(day.date)}
                        aria-pressed={isSelected}
                        className={cn(
                            'flex flex-1 flex-col items-center rounded-xl px-2 py-1',
                            isSelected && 'bg-primary text-secondary',
                        )}
                    >
                        <span className="text-2xl font-bold">{day.weekday}</span>
                        <span className="text-2xl font-medium">{day.date}</span>
                    </button>
                )
            })}
        </div>
    )
}
