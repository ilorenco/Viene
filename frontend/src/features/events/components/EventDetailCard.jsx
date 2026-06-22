import { Link } from 'react-router-dom'

import { EventMeta } from '@/features/events/components/EventMeta'
import { useTicket } from '@/hooks/useTicket'

export function EventDetailCard({ id, title, address, datetime, showTicketButton }) {
    const { hasTicket, toggle } = useTicket(id, showTicketButton)

    return (
        <article className="border-secondary flex w-full flex-col gap-3 rounded-lg border-2 p-3">
            {/* Imagem (placeholder) com link para os detalhes do evento. O título
                fica sobre a imagem, com um respiro nas laterais (left-3/right-3)
                para não encostar na borda direita. */}
            <div className="bg-primary relative h-48 rounded-md">
                <Link
                    to={`/events/${id}`}
                    aria-label={title}
                    className="absolute inset-0 z-10 rounded-md"
                />
                <h3 className="font-montserrat text-secondary absolute right-3 bottom-3 left-3 text-xl font-extrabold">
                    {title}
                </h3>

                {showTicketButton && (
                    <button
                        type="button"
                        aria-pressed={hasTicket}
                        onClick={toggle}
                        className="bg-secondary text-primary absolute top-3 right-3 z-20 cursor-pointer rounded-full px-3 py-1 text-sm font-medium"
                    >
                        {hasTicket ? 'Cancelar Ticket' : 'Gerar Ticket'}
                    </button>
                )}
            </div>

            <div className="text-secondary flex flex-col gap-2">
                {/* Endereço: linha cheia, do canto esquerdo ao direito do card. */}
                <EventMeta address={address} iconClassName="size-4" className="text-xs" />

                {/* Data à esquerda + botão de detalhes à direita. */}
                <div className="flex items-center justify-between gap-3">
                    <EventMeta
                        datetime={datetime}
                        iconClassName="size-4"
                        className="min-w-0 flex-1 text-xs"
                    />
                    <Link
                        to={`/events/${id}`}
                        className="bg-primary text-secondary shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition active:scale-95"
                    >
                        Detalhes
                    </Link>
                </div>
            </div>
        </article>
    )
}
