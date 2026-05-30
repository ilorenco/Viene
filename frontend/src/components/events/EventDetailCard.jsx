import { Link } from 'react-router-dom'

import { EventMeta } from '@/components/events/EventMeta'
import { LikeButton } from '@/components/ui/LikeButton'

export function EventDetailCard({ id, title, address, datetime, onGenerateTicket }) {
    return (
        <article className="border-secondary relative flex w-full flex-col gap-3 rounded-lg border-2 p-3">
            <Link to={`/events/${id}`} aria-label={title} className="absolute inset-0 z-10" />

            <div className="bg-primary relative h-48 rounded-md">
                <h3 className="font-montserrat text-secondary absolute bottom-3 left-3 text-xl font-extrabold">
                    {title}
                </h3>

                {onGenerateTicket && (
                    <button
                        type="button"
                        onClick={onGenerateTicket}
                        className="bg-secondary text-primary absolute top-3 right-3 z-20 cursor-pointer rounded-full px-3 py-1 text-sm font-medium"
                    >
                        Gerar Ticket
                    </button>
                )}
            </div>

            <div className="text-secondary flex items-end justify-between gap-3">
                <EventMeta address={address} datetime={datetime} className="text-sm" />

                <LikeButton className="relative z-20" />
            </div>
        </article>
    )
}
