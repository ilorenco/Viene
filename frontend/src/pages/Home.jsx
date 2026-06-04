import { MapPin } from 'lucide-react'
import { Suspense, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { EventCarousel, EventCarouselSkeleton } from '@/features/events/components/EventCarousel'
import { useEvents } from '@/features/events/hooks/useEvents'
import { mockFilterOptions, mockPlaceOptions } from '@/features/home/mocks/homeFilters'

const sections = ['Propagandas', 'Novos eventos', 'Principais agentes de inovação']

function HomeCarousels() {
    const { data: events } = useEvents()
    return sections.map((title) => <EventCarousel key={title} title={title} events={events} />)
}

function HomeCarouselsSkeleton() {
    return sections.map((title) => <EventCarouselSkeleton key={title} title={title} />)
}

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

            <Suspense fallback={<HomeCarouselsSkeleton />}>
                <HomeCarousels />
            </Suspense>
        </>
    )
}
