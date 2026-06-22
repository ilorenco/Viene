// Seção "Explore!" da Home: fundo escuro (cinza do tema) indo de FORA A FORA
// (FullBleed = largura total da janela), com o conteúdo alinhado à página
// (lg:px-[10%]). Título à esquerda e os filtros (ordenar recentes/antigos + cidade)
// no canto superior direito, na mesma altura do título. Abaixo, os carrosséis de
// eventos e atores (busca via React Query + <Suspense>), já filtrados/ordenados.

import { ArrowDownNarrowWide, MapPin } from 'lucide-react'
import { Suspense, useState } from 'react'

import { FullBleed } from '@/components/layout/FullBleed'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { ActorCarousel } from '@/features/actors/components/ActorCarousel'
import { EventCarousel } from '@/features/events/components/EventCarousel'
import { useCityOptions } from '@/features/home/hooks/useCityOptions'
import { useExploreCarousels } from '@/features/home/hooks/useExploreCarousels'
import { mockSortOptions } from '@/features/home/mocks/homeFilters'
import { cn } from '@/lib/utils'

// Carrosséis filtrados/ordenados conforme os controles acima (regra no hook).
function ExploreCarousels({ sort, city }) {
    const { events, actors } = useExploreCarousels(sort, city)

    return (
        <>
            <EventCarousel title="Novos eventos" events={events} />
            <ActorCarousel title="Principais agentes de inovação" actors={actors} />
        </>
    )
}

// Placeholder (claro sobre o escuro) dos dois carrosséis, via <Suspense>.
function ExploreSkeleton() {
    return (
        <div className="flex animate-pulse flex-col gap-6">
            {Array.from({ length: 2 }).map((_, section) => (
                <div key={section} className="flex flex-col gap-3">
                    <div className="h-6 w-48 rounded bg-white/15" />
                    <div className="flex gap-4 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, card) => (
                            <div key={card} className="h-40 w-72 shrink-0 rounded-md bg-white/10" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

const TRIGGER_CLASS =
    'text-background border-background/20 bg-white/10 gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold sm:text-sm'

// Opções de cidade vêm dos atores reais (useCityOptions -> useActors,
// Suspense próprio): cai na mesma cache de ['actors'] do carrossel, sem
// disparar uma 2ª busca.
function CityFilter({ city, onChange }) {
    const options = useCityOptions()
    return (
        <Select value={city} onValueChange={onChange}>
            <SelectTrigger className={TRIGGER_CLASS}>
                <MapPin className="text-primary size-4 shrink-0" />
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

function CityFilterFallback() {
    return (
        <div className={cn(TRIGGER_CLASS, 'inline-flex items-center opacity-50')}>
            <MapPin className="text-primary size-4 shrink-0" />
            Todas as cidades
        </div>
    )
}

export function HomeExplore() {
    const [sort, setSort] = useState('recentes')
    const [city, setCity] = useState('todas')

    return (
        <FullBleed className="bg-secondary">
            <section className="flex flex-col gap-5 px-4 py-6 lg:px-[10%] lg:py-8">
                {/* Título + filtros (canto superior direito, na altura do título) */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-montserrat text-background text-2xl font-extrabold">
                        Explore nossos catálogos!
                    </h2>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className={TRIGGER_CLASS}>
                                <ArrowDownNarrowWide className="text-primary size-4 shrink-0" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {mockSortOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Suspense fallback={<CityFilterFallback />}>
                            <CityFilter city={city} onChange={setCity} />
                        </Suspense>
                    </div>
                </div>

                <Suspense fallback={<ExploreSkeleton />}>
                    <ExploreCarousels sort={sort} city={city} />
                </Suspense>
            </section>
        </FullBleed>
    )
}
