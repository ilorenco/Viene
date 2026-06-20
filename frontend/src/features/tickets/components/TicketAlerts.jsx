// Botão "Alertas" (com o nº de avisos) + popover que lista os eventos PRÓXIMOS —
// os que acontecem de hoje até ALERT_WINDOW_DAYS dias à frente. Serve para o usuário
// não perder um evento que está chegando. (Mock: usa a data atual do navegador; os
// eventos de exemplo estão em junho/julho de 2026.)

import { Bell, CalendarClock, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

const ALERT_WINDOW_DAYS = 7

// Dias inteiros entre hoje (00:00) e a data ISO do evento (negativo = já passou).
function daysUntil(iso) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const [year, month, day] = iso.split('-').map(Number)
    const target = new Date(year, month - 1, day)
    return Math.round((target.getTime() - today.getTime()) / 86_400_000)
}

function relativeLabel(days) {
    if (days === 0) return 'É hoje!'
    if (days === 1) return 'É amanhã'
    return `Em ${days} dias`
}

export function TicketAlerts({ events, className, compact = false }) {
    const [open, setOpen] = useState(false)

    // Próximos: de hoje (0) até a janela de alerta, ordenados do mais perto ao mais
    // distante. Eventos que já passaram (days < 0) ficam de fora.
    const upcoming = events
        .map((event) => ({ ...event, days: daysUntil(event.date) }))
        .filter((event) => event.days >= 0 && event.days <= ALERT_WINDOW_DAYS)
        .sort((a, b) => a.days - b.days)

    const count = upcoming.length

    return (
        <div className={cn('relative', className)}>
            {compact ? (
                // Mobile: só o sino (circular) com um marcador no canto mostrando a
                // quantidade — economiza espaço para o título caber em uma linha.
                <button
                    type="button"
                    aria-expanded={open}
                    aria-label={`Alertas de eventos próximos (${count})`}
                    onClick={() => setOpen((value) => !value)}
                    className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition active:scale-95"
                >
                    <Bell className="size-5" />
                    {count > 0 && (
                        <span className="bg-primary text-secondary absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full px-1 text-xs font-extrabold">
                            {count}
                        </span>
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    aria-expanded={open}
                    aria-label={`Alertas de eventos próximos (${count})`}
                    onClick={() => setOpen((value) => !value)}
                    className="bg-primary text-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm transition active:scale-95"
                >
                    <Bell className="size-4 shrink-0" />
                    Alertas
                    {count > 0 && (
                        <span className="bg-secondary text-background flex size-5 items-center justify-center rounded-full text-xs font-extrabold">
                            {count}
                        </span>
                    )}
                </button>
            )}

            {open && (
                <>
                    {/* Clicar fora fecha o popover. */}
                    <button
                        type="button"
                        aria-hidden="true"
                        tabIndex={-1}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[60] cursor-default"
                    />
                    <div className="bg-background absolute top-full right-0 z-[61] mt-2 flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-xl p-3 shadow-xl">
                        <div className="flex items-center justify-between">
                            <p className="text-secondary font-montserrat text-sm font-extrabold">
                                Eventos próximos
                            </p>
                            <button
                                type="button"
                                aria-label="Fechar"
                                onClick={() => setOpen(false)}
                                className="text-secondary/60 transition active:scale-90"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        {count === 0 ? (
                            <p className="text-secondary/60 text-sm">
                                Nenhum evento nos próximos {ALERT_WINDOW_DAYS} dias.
                            </p>
                        ) : (
                            <ul className="flex flex-col gap-1">
                                {upcoming.map((event) => (
                                    <li key={event.id}>
                                        <Link
                                            to={`/events/${event.id}`}
                                            onClick={() => setOpen(false)}
                                            className="hover:bg-secondary/5 flex items-center gap-3 rounded-lg p-2 transition"
                                        >
                                            <CalendarClock className="text-primary size-5 shrink-0" />
                                            <span className="flex min-w-0 flex-col">
                                                <span className="text-secondary truncate text-sm font-semibold">
                                                    {event.title}
                                                </span>
                                                <span
                                                    className={cn(
                                                        'text-xs font-bold',
                                                        event.days <= 1
                                                            ? 'text-danger'
                                                            : 'text-secondary/60',
                                                    )}
                                                >
                                                    {relativeLabel(event.days)}
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
