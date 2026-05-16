import { ChevronDown, MapPin } from 'lucide-react'

import { EventCarousel } from '@/components/events/EventCarousel'
import { mockEvents } from '@/mocks/events'

export function Home() {
    return (
        <div className="flex flex-col gap-5 p-3">
            <header className="flex items-center justify-between">
                {/* Esboço inicial apenas para design da tela, transformar isso aqui em um select depois */}
                <button type="button" className="flex items-center gap-1 leading-none">
                    <MapPin size={25} strokeWidth={2.25} />
                    <span>Todos os lugares</span>
                    <ChevronDown size={25} strokeWidth={2.25} />
                </button>

                <button
                    type="button"
                    className="bg-primary flex items-center gap-1 rounded-full px-3 py-2 leading-none"
                >
                    <span>Filtrar por</span>
                    <ChevronDown size={20} />
                </button>
            </header>

            <EventCarousel title="Propagandas" events={mockEvents} />
            <EventCarousel title="Novos eventos" events={mockEvents} />
            <EventCarousel title="Principais agentes de inovação" events={mockEvents} />
        </div>
    )
}
