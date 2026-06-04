import { MapPin } from 'lucide-react'
import { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { EventCarousel } from '@/features/events/components/EventCarousel'
import { mockEvents } from '@/features/events/mocks/events'
import { mockFilterOptions, mockPlaceOptions } from '@/features/home/mocks/homeFilters'

export function Home() {
    const [place, setPlace] = useState('all')
    const [filter, setFilter] = useState('recent')

    return (
        <>
            <header className="flex items-center justify-between">
                <Select value={place} onValueChange={setPlace}>
                    <SelectTrigger>
                        <MapPin strokeWidth={2.25} className="size-6" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {mockPlaceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="bg-primary rounded-full px-3 py-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {mockFilterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </header>

            <EventCarousel title="Propagandas" events={mockEvents} />
            <EventCarousel title="Novos eventos" events={mockEvents} />
            <EventCarousel title="Principais agentes de inovação" events={mockEvents} />
        </>
    )
}
