import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FullBleed } from '@/components/layout/FullBleed'
import { Skeleton } from '@/components/ui/Skeleton'
import { EventMeta } from '@/features/events/components/EventMeta'
import { useEvent } from '@/features/events/hooks/useEvent'
import { NotFound } from '@/pages/NotFound'

function EventDetailsContent() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: event } = useEvent(Number(id))

    if (!event) {
        return <NotFound />
    }

    return (
        <>
            {/* -mt-4 cancela o pt do <main> (hero de topo) — ver MainLayout. */}
            <FullBleed className="bg-primary -mt-4 h-56">
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

function EventDetailsSkeleton() {
    return (
        <>
            {/* -mt-4: idem hero acima — ver MainLayout. */}
            <FullBleed className="-mt-4 h-56">
                <Skeleton className="h-full w-full rounded-none" />
            </FullBleed>

            <header className="flex flex-col gap-4">
                <Skeleton className="h-8 w-3/4" />

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-7 shrink-0" />
                        <Skeleton className="h-3 flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-7 shrink-0" />
                        <Skeleton className="h-3 w-2/3" />
                    </div>
                </div>

                <Skeleton className="h-1 w-full rounded-full" />
            </header>

            <section className="flex flex-col gap-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
            </section>

            <section className="flex flex-col gap-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
            </section>
        </>
    )
}

export function EventDetails() {
    return (
        <Suspense fallback={<EventDetailsSkeleton />}>
            <EventDetailsContent />
        </Suspense>
    )
}
