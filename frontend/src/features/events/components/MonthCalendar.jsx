// Grade de um mês: destaca os dias com eventos e permite SELECIONAR um dia.
// Reutilizada pelo filtro de data dos eventos (EventDateFilter).

import { cn } from '@/lib/utils'

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MONTH_NAMES = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
]

function pad(value) {
    return String(value).padStart(2, '0')
}

function isoFor(year, month, day) {
    return `${year}-${pad(month + 1)}-${pad(day)}`
}

// Avança/retrocede meses cuidando da virada de ano.
// eslint-disable-next-line react-refresh/only-export-components -- helper de data compartilhado com o MapEventDateFilter
export function addMonths(year, month, amount) {
    const total = year * 12 + month + amount
    return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 }
}

export function MonthCalendar({ year, month, eventDates, selectedDay, onSelectDay }) {
    const startWeekday = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells = []
    for (let i = 0; i < startWeekday; i += 1) cells.push(null)
    for (let day = 1; day <= daysInMonth; day += 1) cells.push(day)

    return (
        <div className="w-72 shrink-0">
            <p className="text-secondary mb-2 text-center text-base font-bold">
                {MONTH_NAMES[month]} {year}
            </p>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {WEEKDAYS.map((weekday, index) => (
                    <span key={index} className="text-secondary/40 font-semibold">
                        {weekday}
                    </span>
                ))}
                {cells.map((day, index) => {
                    if (day === null) return <span key={index} />
                    const iso = isoFor(year, month, day)
                    const hasEvent = eventDates.has(iso)
                    const isSelected = selectedDay === iso
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onSelectDay(iso)}
                            className={cn(
                                'mx-auto flex size-9 items-center justify-center rounded-full transition',
                                isSelected
                                    ? 'bg-secondary text-background font-bold'
                                    : hasEvent
                                      ? 'bg-primary text-secondary font-bold'
                                      : 'text-secondary hover:bg-secondary/10',
                            )}
                        >
                            {day}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
