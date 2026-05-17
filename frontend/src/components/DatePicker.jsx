import { cn } from '@/lib/utils'

const mockDays = [
    { day: 'SEG', date: 14 },
    { day: 'TER', date: 15 },
    { day: 'QUA', date: 16 },
    { day: 'QUI', date: 17 },
    { day: 'SEX', date: 18 },
]

export function DatePicker({ value, onChange }) {
    return (
        <div className="flex items-center gap-2">
            {mockDays.map((d) => {
                const isSelected = value === d.date
                return (
                    <button
                        key={d.date}
                        type="button"
                        onClick={() => onChange(d.date)}
                        aria-pressed={isSelected}
                        className={cn(
                            'flex flex-1 flex-col items-center rounded-xl px-2 py-1',
                            isSelected && 'bg-primary text-secondary',
                        )}
                    >
                        <span className="text-2xl font-bold">{d.day}</span>
                        <span className="text-2xl font-medium">{d.date}</span>
                    </button>
                )
            })}
        </div>
    )
}
