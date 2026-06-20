// Filtro de eventos por DATA/PERÍODO. UM único botão "Selecionar Período" abre um
// modal com DUAS formas de filtrar (a pedido):
//   - Escolher um dia no CALENDÁRIO (filtra os eventos daquele dia; dias com
//     eventos ficam destacados);
//   - "Eventos que vão ocorrer em até X dias" (de hoje até daqui a X dias).
// Os dois definem o período { from, to } (ISO) usado pela página de Eventos.

import { CalendarRange, ChevronLeft, ChevronRight, X } from 'lucide-react'
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
    const [open, setOpen] = useState(false)
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
        setOpen(false)
    }

    function applyDays(amount) {
        onChange({ from: todayIso(), to: isoPlusDays(amount) })
        setOpen(false)
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
                onClick={() => setOpen(true)}
                className="bg-background text-secondary border-secondary/15 flex items-center gap-1.5 rounded-full border px-2 py-1.5 text-xs font-semibold shadow-sm transition active:scale-95 lg:gap-2 lg:px-4 lg:py-2 lg:text-sm"
            >
                <CalendarRange className="text-primary size-4 shrink-0 lg:size-5" />
                <span className="leading-tight">Selecionar Período</span>
            </button>

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

            <Modal open={open} onOpenChange={setOpen}>
                <ModalContent aria-describedby={undefined} className="max-w-sm">
                    <ModalTitle>Selecionar Período</ModalTitle>

                    {/* Opção 1: escolher um dia no calendário */}
                    <div className="flex flex-col gap-2">
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
                                Escolha um dia (eventos em destaque)
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
                    </div>

                    {/* Separador "ou" */}
                    <div className="flex items-center gap-2">
                        <span className="border-secondary/10 flex-1 border-t" />
                        <span className="text-secondary/50 text-xs font-semibold">ou</span>
                        <span className="border-secondary/10 flex-1 border-t" />
                    </div>

                    {/* Opção 2: eventos que vão ocorrer em até X dias */}
                    <div className="flex flex-col gap-2">
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
                </ModalContent>
            </Modal>
        </div>
    )
}
