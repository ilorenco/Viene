import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { EventMeta } from '@/components/events/EventMeta'
import { FullBleed } from '@/components/layout/FullBleed'
import { mockEvents } from '@/mocks/events'

export function EventDetails() {
    const { id } = useParams()
    const eventId = Number(id)
    const event = mockEvents.find((e) => e.id === eventId) ?? mockEvents[0]

    return (
        <>
            <FullBleed className="bg-primary -mt-4 h-56">
                <div className="flex items-center justify-between p-4">
                    <button type="button" aria-label="Voltar">
                        <ArrowLeft size={30} />
                    </button>

                    <div className="flex items-center gap-2">
                        <button type="button" aria-label="Compartilhar">
                            <Share2 size={30} />
                        </button>
                        <button type="button" aria-label="Favoritar">
                            <Heart size={30} fill="currentColor" />
                        </button>
                    </div>
                </div>
            </FullBleed>

            <header className="flex flex-col gap-4">
                <h1 className="text-2xl font-extrabold">{event.title}</h1>

                <EventMeta
                    address={event.address}
                    datetime={event.datetime}
                    iconSize={28}
                    className="text-xs"
                />

                <hr className="border-primary rounded-full border-t-4" />
            </header>

            <section className="flex flex-col gap-2">
                <h2 className="font-inter font-semibold">Descrição do Evento</h2>
                <p className="text-xs">
                    {event.description}{' '}
                    <button type="button" className="text-primary font-semibold">
                        Ver descrição completa
                    </button>
                </p>
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="font-inter font-semibold">Políticas do Evento</h2>
                <p className="text-xs">{event.policies}</p>
            </section>
        </>
    )
}
