// Tela de Especificações do Ator (/actors/:id). Conexão no MESMO padrão de
// detalhe do colega (ver EventDetails na main): useSuspenseQuery por id
// (useActor) + apenas <Suspense> (o erro é tratado de forma central no
// MainLayout, não por página); ator inexistente cai no <NotFound/>. Banner
// full-bleed com -mt-24 (cancela o pt do <main>, convenção do colega).
//
// Desacoplada: as REGRAS de "relacionados" ficam em hooks (useRelatedActors /
// useRelatedEvents) e a montagem dos CONTATOS em um componente de apresentação
// (ActorContactList). A página só orquestra o estado da rota e desenha.

import { ArrowLeft, CalendarDays, MapPin, Tag, Users } from 'lucide-react'
import { Suspense } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FullBleed } from '@/components/layout/FullBleed'
import { ActorActions } from '@/features/actors/components/ActorActions'
import { ActorContactList } from '@/features/actors/components/ActorContactList'
import { ActorList } from '@/features/actors/components/ActorList'
import { ActorProfileSkeleton } from '@/features/actors/components/ActorProfileFallbacks'
import { useActor } from '@/features/actors/hooks/useActor'
import { useRelatedActors } from '@/features/actors/hooks/useRelatedActors'
import { useRelatedEvents } from '@/features/actors/hooks/useRelatedEvents'
import { EventList } from '@/features/events/components/EventList'
import { ATOR_AREAS, colorForType, labelForType } from '@/lib/atorTypes'
import { NotFound } from '@/pages/NotFound'

// Fallback simples enquanto uma seção de relacionados carrega.
function RelatedFallback() {
    return <div className="bg-secondary/10 h-40 animate-pulse rounded-lg" />
}

// Atores relacionados: a REGRA está no hook useRelatedActors; aqui só desenha.
function RelatedActors({ actor }) {
    const related = useRelatedActors(actor)

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

// Eventos relacionados: a REGRA está no hook useRelatedEvents; aqui só desenha.
function RelatedEvents({ actor }) {
    const related = useRelatedEvents(actor)

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

function ActorProfileContent() {
    const { id } = useParams()
    const navigate = useNavigate()
    // Detalhe no padrão do colega: useSuspenseQuery por id (ver useEvent na main).
    const { data: actor } = useActor(Number(id))

    // Ator inexistente: cai no NotFound (mesmo padrão do EventDetails do colega).
    if (!actor) return <NotFound />

    const area = ATOR_AREAS.find((item) => item.id === actor.category)
    const location = [actor.neighborhood, actor.city].filter(Boolean).join(', ')

    return (
        <>
            {/* Banner full-bleed (lado a lado): botão Voltar (canto superior
                esquerdo, com respiro do menu e da borda) + a área do ator.
                -mt-24 cancela o pt do <main> (mesma convenção do colega). */}
            <FullBleed className="bg-secondary -mt-24">
                <div className="flex flex-col gap-3 px-4 py-7 lg:px-[10%]">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-95"
                    >
                        <ArrowLeft className="size-5" />
                        Voltar
                    </button>

                    {area && (
                        <span className="flex items-center gap-2 text-sm font-semibold text-white/70">
                            <span
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: area.color }}
                            />
                            {area.label}
                        </span>
                    )}
                </div>
            </FullBleed>

            {/* Imagem (esquerda) + informações (direita). */}
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                <div className="lg:w-80 lg:shrink-0">
                    {actor.image ? (
                        <img
                            src={actor.image}
                            alt={actor.name}
                            className="aspect-square w-full rounded-2xl object-cover"
                        />
                    ) : (
                        <div
                            className="bg-primary flex aspect-square w-full items-center justify-center rounded-2xl"
                            aria-hidden="true"
                        >
                            <span className="font-montserrat text-secondary/40 text-7xl font-extrabold">
                                {actor.name.charAt(0)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4">
                    {/* Título + Tipo à esquerda; ações (favoritar / mais opções) no
                        canto superior direito, na mesma altura do título. */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="font-montserrat text-secondary text-3xl font-extrabold">
                                {actor.name}
                            </h1>
                            <span
                                className="rounded-full px-3 py-1 text-sm font-bold"
                                style={{
                                    backgroundColor: colorForType(actor.type),
                                    color: '#282828',
                                }}
                            >
                                {labelForType(actor.type)}
                            </span>
                        </div>
                        <ActorActions name={actor.name} entityId={actor.id} />
                    </div>

                    {/* Tags */}
                    {actor.tags && (
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-primary/15 text-primary flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold">
                                <Tag className="size-4" />
                                {actor.tags}
                            </span>
                        </div>
                    )}

                    {/* Localização + Ano de fundação */}
                    <dl className="flex flex-col gap-2 text-sm">
                        {(actor.address || location) && (
                            <div className="flex items-start gap-2">
                                <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                                <dd className="text-secondary/80">
                                    {actor.address || location}
                                    {actor.cep ? ` — ${actor.cep}` : ''}
                                </dd>
                            </div>
                        )}
                        {actor.founded && (
                            <div className="flex items-center gap-2">
                                <CalendarDays className="text-primary size-4 shrink-0" />
                                <dd className="text-secondary/80">Fundação: {actor.founded}</dd>
                            </div>
                        )}
                    </dl>

                    {/* Descrição */}
                    {actor.description && (
                        <p className="text-secondary/80 text-sm leading-relaxed">
                            {actor.description}
                        </p>
                    )}

                    {/* Contatos e redes (chips: ícone + nome) — montagem no
                        componente ActorContactList. */}
                    <ActorContactList
                        website={actor.website}
                        phone={actor.phone}
                        email={actor.email}
                        linkedin={actor.linkedin}
                        instagram={actor.instagram}
                        youtube={actor.youtube}
                    />
                </div>
            </div>

            {/* Relacionados: cada um busca sua lista e suspende sozinho (padrão de
                hook do colega — um useSuspenseQuery por recurso). */}
            <Suspense fallback={<RelatedFallback />}>
                <RelatedEvents actor={actor} />
            </Suspense>
            <Suspense fallback={<RelatedFallback />}>
                <RelatedActors actor={actor} />
            </Suspense>
        </>
    )
}

// Página: só <Suspense> (o erro é tratado de forma central no MainLayout, como
// nas telas do colega). Quem busca o ator (useActor) e suspende é o conteúdo.
export function ActorProfile() {
    return (
        <Suspense fallback={<ActorProfileSkeleton />}>
            <ActorProfileContent />
        </Suspense>
    )
}
