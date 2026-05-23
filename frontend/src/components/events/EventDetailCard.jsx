import { Heart } from 'lucide-react'

import { EventMeta } from '@/components/events/EventMeta'
import { Card } from '@/components/ui/Card'

export function EventDetailCard({ title, address, datetime, onGenerateTicket }) {
    return (
        <Card as="article" className="border-secondary w-full gap-3 rounded-lg border-2 p-3">
            <div className="bg-primary relative h-48 rounded-md">
                <h3 className="font-montserrat text-secondary absolute bottom-3 left-3 text-xl font-extrabold">
                    {title}
                </h3>

                {onGenerateTicket && (
                    <button
                        type="button"
                        onClick={onGenerateTicket}
                        className="bg-secondary text-primary absolute top-3 right-3 rounded-full px-3 py-1 text-sm font-medium"
                    >
                        Gerar Ticket
                    </button>
                )}
            </div>

            <div className="text-secondary flex items-end justify-between gap-3">
                <EventMeta address={address} datetime={datetime} className="text-sm" />

                <button type="button" aria-label="Favoritar" className="shrink-0">
                    <Heart size={40} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
                </button>
            </div>
        </Card>
    )
}
