// Bloco do Perfil de ATOR: "Minhas publicações" — os atores e eventos sob a
// responsabilidade do usuário (que ele cadastrou ou assumiu a manutenção). Cada
// item usa o CARD PADRÃO (do catálogo) + um selo de status (Ativo/Bloqueado) e um
// botão "Editar" que abre o popup de edição (sem nova solicitação ao admin, por
// ser uma publicação dele). Só aparece para usuários do tipo "ator" (ver Profile).

import { Pencil } from 'lucide-react'
import { Suspense, useState } from 'react'

import { ActorCard, ActorCardSkeleton } from '@/features/actors/components/ActorCard'
import { EventDetailCard } from '@/features/events/components/EventDetailCard'
import { EditActorModal } from '@/features/profile/components/EditActorModal'
import { EditEventModal } from '@/features/profile/components/EditEventModal'
import { useMyPublications } from '@/features/profile/hooks/useMyPublications'
import { cn } from '@/lib/utils'

// Casca de um item: linha de status + "Editar" acima do card padrão.
function PublicationItem({ status, onEdit, children }) {
    const ativo = status === 'ativo'
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <span
                    className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        ativo ? 'bg-green-100 text-green-700' : 'bg-danger/10 text-danger',
                    )}
                >
                    {ativo ? 'Ativo' : 'Bloqueado'}
                </span>
                <button
                    type="button"
                    onClick={onEdit}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-semibold transition"
                >
                    <Pencil className="size-4" />
                    Editar
                </button>
            </div>
            {children}
        </div>
    )
}

function Group({ title, children }) {
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-secondary text-sm font-bold tracking-wide uppercase">{title}</h3>
            <div className="grid gap-3 sm:grid-cols-2">{children}</div>
        </div>
    )
}

function MyPublicationsContent() {
    const { actors, events } = useMyPublications()
    const [editingActor, setEditingActor] = useState(null)
    const [editingEvent, setEditingEvent] = useState(null)

    // Opções de vínculo: o evento liga aos SEUS atores e vice-versa.
    const actorOptions = actors.map((actor) => ({ id: actor.id, label: actor.name }))
    const eventOptions = events.map((event) => ({ id: event.id, label: event.title }))

    return (
        <section className="flex flex-col gap-5">
            <div>
                <h2 className="text-secondary font-montserrat text-xl font-extrabold">
                    Minhas publicações
                </h2>
                <p className="text-secondary/60 text-sm">
                    Atores e eventos sob a sua responsabilidade. Você edita direto, sem nova
                    aprovação de um administrador.
                </p>
            </div>

            {actors.length > 0 && (
                <Group title="Atores">
                    {actors.map((actor) => (
                        <PublicationItem
                            key={actor.id}
                            status={actor.status}
                            onEdit={() => setEditingActor(actor)}
                        >
                            <ActorCard
                                id={actor.id}
                                name={actor.name}
                                description={actor.description}
                                image={actor.image}
                                neighborhood={actor.neighborhood}
                                city={actor.city}
                            />
                        </PublicationItem>
                    ))}
                </Group>
            )}

            {events.length > 0 && (
                <Group title="Eventos">
                    {events.map((event) => (
                        <PublicationItem
                            key={event.id}
                            status={event.status}
                            onEdit={() => setEditingEvent(event)}
                        >
                            <EventDetailCard
                                id={event.id}
                                title={event.title}
                                image={event.image}
                                address={event.address}
                                datetime={event.datetime}
                            />
                        </PublicationItem>
                    ))}
                </Group>
            )}

            {/* `key` por id: garante uma instância nova (estado fresco) a cada
                publicação editada, sem resíduo do item anterior. */}
            {editingActor && (
                <EditActorModal
                    key={editingActor.id}
                    open
                    onClose={() => setEditingActor(null)}
                    actor={editingActor}
                    eventOptions={eventOptions}
                />
            )}
            {editingEvent && (
                <EditEventModal
                    key={editingEvent.id}
                    open
                    onClose={() => setEditingEvent(null)}
                    event={editingEvent}
                    actorOptions={actorOptions}
                />
            )}
        </section>
    )
}

function MyPublicationsFallback() {
    return (
        <section className="flex flex-col gap-3" aria-hidden="true">
            <div className="bg-secondary/10 h-6 w-44 animate-pulse rounded" />
            <div className="grid gap-3 sm:grid-cols-2">
                <ActorCardSkeleton />
                <ActorCardSkeleton />
            </div>
        </section>
    )
}

export function MyPublications() {
    return (
        <Suspense fallback={<MyPublicationsFallback />}>
            <MyPublicationsContent />
        </Suspense>
    )
}
