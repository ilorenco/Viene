import { useState } from 'react'

import { ActorList } from '@/components/actors/ActorList'
import { EventList } from '@/components/events/EventList'
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

            {tab === 'eventos' && <EventList events={mockEvents} />}
            {tab === 'atores' && <ActorList actors={mockActors} />}
        </>
    )
}
