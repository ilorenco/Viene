import { cn } from '@/lib/utils'

const mockDays = [
    { weekday: 'SEG', date: 14 },
    { weekday: 'TER', date: 15 },
    { weekday: 'QUA', date: 16 },
    { weekday: 'QUI', date: 17 },
    { weekday: 'SEX', date: 18 },
]

export function DatePicker({ value, onChange }) {
    return (
        <div className="flex items-center gap-2">
            {mockDays.map((day) => {
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
