import { useState } from 'react'

import { EventDetailCard } from '@/components/events/EventDetailCard'
import { Tabs } from '@/components/Tabs'
import { mockEvents } from '@/mocks/events'

export function MyFavorites() {
    const [tab, setTab] = useState('eventos')

    return (
        <div className="flex flex-col gap-5 p-3">
            <header className="flex flex-col gap-2">
                <h1 className="text-secondary flex flex-col">
                    <span className="text-2xl">MEUS</span>
                    <span className="-mt-1 text-3xl font-extrabold">FAVORITOS</span>
                </h1>

                <div aria-hidden="true" className="-mt-2 flex items-center gap-1">
                    <div className="border-primary flex-1 border-t-4 border-dashed" />
                    <div className="bg-primary h-4 w-4 shrink-0 rounded-full" />
                </div>
            </header>

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
        </div>
    )
}
