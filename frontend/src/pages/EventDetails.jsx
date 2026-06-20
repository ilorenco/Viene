// Especificações do Evento (/events/:id). Gêmea do ActorProfile (mesma interface),
// com as diferenças do evento: o banner traz o TIPO do evento (não a área), a tag é
// de evento, "Fundação" vira "Data" + horários de início/término, há um link para o
// ingresso (Sympla) abaixo da descrição, e os relacionados vêm na ordem "Atores"
// depois "Eventos". Conexão no padrão do colega: useSuspenseQuery por id (useEvent)
// + <Suspense>; o erro é central no MainLayout; evento inexistente cai no NotFound.

import { ArrowLeft, CalendarDays, Clock, MapPin, Tag, Ticket, Users } from 'lucide-react'
import { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FullBleed } from '@/components/layout/FullBleed'
import { ActorActions } from '@/features/actors/components/ActorActions'
import { ActorList } from '@/features/actors/components/ActorList'
import { EventDetailsSkeleton } from '@/features/events/components/EventDetailsFallbacks'
import { EventList } from '@/features/events/components/EventList'
import { useEvent } from '@/features/events/hooks/useEvent'
import { useEventRelatedActors } from '@/features/events/hooks/useEventRelatedActors'
import { useEventRelatedEvents } from '@/features/events/hooks/useEventRelatedEvents'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { NotFound } from '@/pages/NotFound'

// Rótulo do tipo (categoria) do evento.
function categoryLabel(value) {
    return mockEventCategories.find((category) => category.value === value)?.label ?? 'Evento'
}

// Data ISO (YYYY-MM-DD) -> DD/MM/AAAA.
function formatDate(iso) {
    if (!iso) return null
    const [year, month, day] = iso.split('-')
    return `${day}/${month}/${year}`
}

function RelatedFallback() {
    return <div className="bg-secondary/10 h-40 animate-pulse rounded-lg" />
}

// Atores relacionados — vêm PRIMEIRO (a regra está no hook; aqui só desenha).
function RelatedActors({ event }) {
    const related = useEventRelatedActors(event)

    if (!related.length) return null

    return (
        <section className="flex flex-col gap-3">
            <h2 className="font-montserrat text-secondary flex items-center gap-2 text-xl font-extrabold">
                <Users className="text-primary size-5" />
                Atores relacionados
            </h2>
            <ActorList actors={related} />
        </section>
    )
}

// Eventos relacionados — vêm DEPOIS dos atores.
function RelatedEvents({ event }) {
    const related = useEventRelatedEvents(event)

    if (!related.length) return null

    return (
        <section className="flex flex-col gap-3">
            <h2 className="font-montserrat text-secondary flex items-center gap-2 text-xl font-extrabold">
                <CalendarDays className="text-primary size-5" />
                Eventos relacionados
            </h2>
            <EventList events={related} />
        </section>
    )
}

function EventDetailsContent() {
    const { id } = useParams()
    const navigate = useNavigate()
    // Detalhe no padrão do colega: useSuspenseQuery por id (igual ao useActor).
    const { data: event } = useEvent(Number(id))

    // Evento inexistente: cai no NotFound (mesmo padrão do ActorProfile).
    if (!event) return <NotFound />

    const type = categoryLabel(event.category)

    return (
        <>
            {/* Banner full-bleed: botão Voltar + o TIPO do evento (não a área).
                -mt-4 cancela o pt do <main> (convenção do colega). */}
            <FullBleed className="bg-secondary -mt-4">
                <div className="flex flex-col gap-3 px-4 py-7 lg:px-[10%]">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-95"
                    >
                        <ArrowLeft className="size-5" />
                        Voltar
                    </button>

                    <span className="flex items-center gap-2 text-sm font-semibold text-white/70">
                        <CalendarDays className="text-primary size-4 shrink-0" />
                        {type}
                    </span>
                </div>
            </FullBleed>

            {/* Imagem (esquerda) + informações (direita). */}
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                <div className="lg:w-80 lg:shrink-0">
                    {event.image ? (
                        <img
                            src={event.image}
                            alt={event.title}
                            className="aspect-square w-full rounded-2xl object-cover"
                        />
                    ) : (
                        <div
                            className="bg-primary flex aspect-square w-full items-center justify-center rounded-2xl"
                            aria-hidden="true"
                        >
                            <CalendarDays className="text-secondary/40 size-24" />
                        </div>
                    )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4">
                    {/* Título + ações (favoritar / mais opções) no canto superior direito. */}
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="font-montserrat text-secondary text-3xl font-extrabold">
                            {event.title}
                        </h1>
                        <ActorActions name={event.title} entityType="evento" />
                    </div>

                    {/* Tag DE EVENTO (a categoria do evento). */}
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-primary/15 text-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold">
                            <Tag className="size-4" />
                            {type}
                        </span>
                    </div>

                    {/* Data + horário de início + horário de término + localização. */}
                    <dl className="flex flex-col gap-2 text-sm">
                        {event.date && (
                            <div className="flex items-center gap-2">
                                <CalendarDays className="text-primary size-4 shrink-0" />
                                <dd className="text-secondary/80">
                                    Data: {formatDate(event.date)}
                                </dd>
                            </div>
                        )}
                        {event.start && (
                            <div className="flex items-center gap-2">
                                <Clock className="text-primary size-4 shrink-0" />
                                <dd className="text-secondary/80">Início: {event.start}</dd>
                            </div>
                        )}
                        {event.end && (
                            <div className="flex items-center gap-2">
                                <Clock className="text-primary size-4 shrink-0" />
                                <dd className="text-secondary/80">Término: {event.end}</dd>
                            </div>
                        )}
                        {event.address && (
                            <div className="flex items-start gap-2">
                                <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                                <dd className="text-secondary/80">{event.address}</dd>
                            </div>
                        )}
                    </dl>

                    {/* Descrição */}
                    {event.description && (
                        <p className="text-secondary/80 text-sm leading-relaxed">
                            {event.description}
                        </p>
                    )}

                    {/* Link do ingresso (abaixo da descrição). */}
                    {event.ticketUrl && (
                        <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-secondary flex items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm font-bold transition active:scale-95"
                        >
                            <Ticket className="size-4" />
                            Ver ingresso
                        </a>
                    )}
                </div>
            </div>

            {/* Relacionados: Atores PRIMEIRO, depois Eventos (cada um suspende sozinho). */}
            <Suspense fallback={<RelatedFallback />}>
                <RelatedActors event={event} />
            </Suspense>
            <Suspense fallback={<RelatedFallback />}>
                <RelatedEvents event={event} />
            </Suspense>
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
