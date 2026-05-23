import { useState } from 'react'

import { EventDetailCard } from '@/components/events/EventDetailCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { Tabs } from '@/components/ui/Tabs'
import { mockEvents } from '@/mocks/events'

export function MyFavorites() {
    const [tab, setTab] = useState('eventos')

    return (
        <>
            <PageHeader top="MEUS" main="FAVORITOS" className="text-secondary" />

            <Tabs value={tab} onChange={setTab} />

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
        </>
    )
}
