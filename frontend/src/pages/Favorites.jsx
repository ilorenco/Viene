import { Suspense, useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs } from '@/components/ui/Tabs'
import { ActorList, ActorListSkeleton } from '@/features/actors/components/ActorList'
import { useActors } from '@/features/actors/hooks/useActors'
import { EventList, EventListSkeleton } from '@/features/events/components/EventList'
import { useEvents } from '@/features/events/hooks/useEvents'

const tabs = [
    { value: 'eventos', label: 'EVENTOS' },
    { value: 'atores', label: 'ATORES' },
]

function FavoriteEvents() {
    const { data: events } = useEvents()
    return <EventList events={events} />
}

function FavoriteActors() {
    const { data: actors } = useActors()
    return <ActorList actors={actors} />
}

export function Favorites() {
    const [tab, setTab] = useState('eventos')

    return (
        <>
            <PageHeader overline="MEUS" title="FAVORITOS" className="text-secondary" />

            <Tabs value={tab} onChange={setTab} options={tabs} />

            {tab === 'eventos' ? (
                <Suspense fallback={<EventListSkeleton />}>
                    <FavoriteEvents />
                </Suspense>
            ) : (
                <Suspense fallback={<ActorListSkeleton />}>
                    <FavoriteActors />
                </Suspense>
            )}
        </>
    )
}
