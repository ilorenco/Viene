import { useState } from 'react'

import { ActorCard } from '@/components/actors/ActorCard'
import { EventDetailCard } from '@/components/events/EventDetailCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs } from '@/components/ui/Tabs'
import { mockActors } from '@/mocks/actors'
import { mockEvents } from '@/mocks/events'

const tabs = [
    { value: 'eventos', label: 'EVENTOS' },
    { value: 'atores', label: 'ATORES' },
]

export function Favorites() {
    const [tab, setTab] = useState('eventos')

    return (
        <>
            <PageHeader overline="MEUS" title="FAVORITOS" className="text-secondary" />

            <Tabs value={tab} onChange={setTab} options={tabs} />

            {tab === 'eventos' && (
                <ul className="flex flex-col gap-3">
                    {mockEvents.map((event) => (
                        <li key={event.id}>
                            <EventDetailCard
                                title={event.title}
                                address={event.address}
                                datetime={event.datetime}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {tab === 'atores' && (
                <ul className="flex flex-col gap-3">
                    {mockActors.map((actor) => (
                        <li key={actor.id}>
                            <ActorCard name={actor.name} description={actor.description} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
