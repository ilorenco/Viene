import { useState } from 'react'

import { CategoryFilter } from '@/components/CategoryFilter'
import { EventDetailCard } from '@/components/events/EventDetailCard'
import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { mockEvents } from '@/mocks/events'

const categories = [
    { value: 'workshops', label: 'Workshops' },
    { value: 'hackathons', label: 'Hackathons' },
    { value: 'meetups', label: 'Meetups' },
    { value: 'palestras', label: 'Palestras' },
    { value: 'conferencias', label: 'Conferências' },
    { value: 'bootcamps', label: 'Bootcamps' },
    { value: 'feiras', label: 'Feiras' },
    { value: 'demoday', label: 'Demo Day' },
]

export function Events() {
    const [category, setCategory] = useState('workshops')

    return (
        <>
            <PageBanner>
                <PageHeader main="Encontre Eventos" />
                <CategoryFilter value={category} onChange={setCategory} options={categories} />
            </PageBanner>

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
        </>
    )
}
