// Filtro de eventos por DATA (fica acima das categorias). Dois controles:
//   - Calendário: abre um popup com o mês para escolher um dia (filtra os eventos
//     daquele dia). Os dias com eventos ficam destacados.
//   - "Em até X dias": eventos que vão ocorrer de hoje até daqui a X dias.
// Os dois definem o período { from, to } (ISO) usado pela página de Eventos.

import { CalendarDays, ChevronLeft, ChevronRight, Clock, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Modal, ModalContent, ModalTitle } from '@/components/ui/Modal'
import { addMonths, MonthCalendar } from '@/features/events/components/MonthCalendar'

function isoFromDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`
}

function todayIso() {
    return isoFromDate(new Date())
}

function isoPlusDays(amount) {
    const date = new Date()
    date.setDate(date.getDate() + amount)
    return isoFromDate(date)
}

const DAY_PRESETS = [7, 15, 30, 60]

export function EventDateFilter({ events, value, onChange }) {
    const [calOpen, setCalOpen] = useState(false)
    const [daysOpen, setDaysOpen] = useState(false)
    // Mês inicial do calendário: junho/2026 (onde estão os eventos de exemplo).
    const [base, setBase] = useState({ year: 2026, month: 5 })
    const [daysInput, setDaysInput] = useState(7)

    const eventDates = useMemo(
        () => new Set((events ?? []).map((event) => event.date).filter(Boolean)),
        [events],
    )

    const singleDay = value.from && value.from === value.to ? value.from : null
    const active = Boolean(value.from || value.to)

    function selectDay(iso) {
        onChange({ from: iso, to: iso })
        setCalOpen(false)
    }

    function applyDays(amount) {
        onChange({ from: todayIso(), to: isoPlusDays(amount) })
        setDaysOpen(false)
    }

    // Rótulo do filtro ativo.
    let activeLabel = null
    if (singleDay) {
        const [year, month, day] = singleDay.split('-')
        activeLabel = `Dia ${day}/${month}/${year}`
    } else if (active && value.from === todayIso() && value.to) {
        const diff = Math.round((new Date(value.to) - new Date(value.from)) / 86_400_000)
        activeLabel = `Próximos ${diff} dias`
    } else if (active) {
        activeLabel = 'Período personalizado'
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                type="button"
                onClick={() => setCalOpen(true)}
                className="bg-background text-secondary border-secondary/15 flex items-center gap-1.5 rounded-full border px-2 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95 lg:gap-2 lg:px-4 lg:py-2 lg:text-sm"
            >
                <CalendarDays className="text-primary size-4 shrink-0 lg:size-5" />
                <span className="max-w-16 leading-tight lg:max-w-none">Escolher data</span>
            </button>

            <div className="relative">
                <button
                    type="button"
                    aria-expanded={daysOpen}
                    onClick={() => setDaysOpen((open) => !open)}
                    className="bg-background text-secondary border-secondary/15 flex items-center gap-1.5 rounded-full border px-2 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95 lg:gap-2 lg:px-4 lg:py-2 lg:text-sm"
                >
                    <Clock className="text-primary size-4 shrink-0 lg:size-5" />
                    <span className="max-w-16 leading-tight lg:max-w-none">Em até… dias</span>
                </button>

                {daysOpen && (
                    <>
                        {/* Clicar fora fecha o popover. */}
                        <button
                            type="button"
                            aria-hidden="true"
                            tabIndex={-1}
                            onClick={() => setDaysOpen(false)}
                            className="fixed inset-0 z-[60] cursor-default"
                        />
                        <div className="bg-background absolute top-full right-0 z-[61] mt-2 flex w-60 max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-xl p-3 shadow-xl lg:right-auto lg:left-0">
                            <p className="text-secondary font-montserrat text-sm font-extrabold">
                                Eventos que vão ocorrer em até:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {DAY_PRESETS.map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => applyDays(amount)}
                                        className="bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg px-3 py-1.5 text-sm font-semibold transition"
                                    >
                                        {amount} dias
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={daysInput}
                                    onChange={(event) =>
                                        setDaysInput(Math.max(1, Number(event.target.value) || 1))
                                    }
                                    aria-label="Quantidade de dias"
                                    className="border-secondary/20 text-secondary w-16 rounded-md border px-2 py-1 text-sm"
                                />
                                <span className="text-secondary/70 text-sm">dias</span>
                                <button
                                    type="button"
                                    onClick={() => applyDays(daysInput)}
                                    className="bg-primary text-secondary ml-auto rounded-lg px-3 py-1.5 text-sm font-bold transition active:scale-95"
                                >
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {activeLabel && (
                <span className="bg-primary/15 text-primary flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold">
                    {activeLabel}
                    <button
                        type="button"
                        aria-label="Limpar filtro de data"
                        onClick={() => onChange({ from: null, to: null })}
                        className="transition active:scale-90"
                    >
                        <X className="size-4" />
                    </button>
                </span>
            )}

            <Modal open={calOpen} onOpenChange={setCalOpen}>
                <ModalContent aria-describedby={undefined} className="max-w-sm">
                    <ModalTitle>Escolher data</ModalTitle>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            aria-label="Mês anterior"
                            onClick={() =>
                                setBase((current) => addMonths(current.year, current.month, -1))
                            }
                            className="text-secondary transition active:scale-90"
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        <span className="text-secondary text-sm font-extrabold">
                            Dias com eventos em destaque
                        </span>
                        <button
                            type="button"
                            aria-label="Próximo mês"
                            onClick={() =>
                                setBase((current) => addMonths(current.year, current.month, 1))
                            }
                            className="text-secondary transition active:scale-90"
                        >
                            <ChevronRight className="size-5" />
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <MonthCalendar
                            year={base.year}
                            month={base.month}
                            eventDates={eventDates}
                            selectedDay={singleDay}
                            onSelectDay={selectDay}
                        />
                    </div>
                </ModalContent>
            </Modal>
        </div>
    )
}
