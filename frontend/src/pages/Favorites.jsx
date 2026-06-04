import { useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs } from '@/components/ui/Tabs'
import { ActorList } from '@/features/actors/components/ActorList'
import { mockActors } from '@/features/actors/mocks/actors'
import { EventList } from '@/features/events/components/EventList'
import { mockEvents } from '@/features/events/mocks/events'

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

            {tab === 'eventos' && <EventList events={mockEvents} />}
            {tab === 'atores' && <ActorList actors={mockActors} />}
        </>
    )
}
