import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { FullBleed } from '@/components/layout/FullBleed'
import { EventMeta } from '@/features/events/components/EventMeta'
import { mockEvents } from '@/features/events/mocks/events'
import { NotFound } from '@/pages/NotFound'

export function EventDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const eventId = Number(id)
    const event = mockEvents.find((e) => e.id === eventId)

    if (!event) {
        return <NotFound />
    }

    return (
        <>
            <FullBleed className="bg-primary h-56">
                <div className="flex items-center justify-between p-4">
                    <button
                        type="button"
                        aria-label="Voltar"
                        onClick={() => navigate(-1)}
                        className="cursor-pointer"
                    >
                        <ArrowLeft className="size-8" />
                    </button>

                    <div className="flex items-center gap-2">
                        <button type="button" aria-label="Compartilhar">
                            <Share2 className="size-8" />
                        </button>
                        <button type="button" aria-label="Favoritar">
                            <Heart fill="currentColor" className="size-8" />
                        </button>
                    </div>
                </div>
            </FullBleed>

            <header className="flex flex-col gap-4">
                <h1 className="text-2xl font-extrabold">{event.title}</h1>

                <EventMeta
                    address={event.address}
                    datetime={event.datetime}
                    iconClassName="size-7"
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
