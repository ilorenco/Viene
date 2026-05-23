import { useState } from 'react'

import { ActorCard } from '@/components/actors/ActorCard'
import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { mockActors } from '@/mocks/actors'

const categories = [
    { value: 'parques', label: 'Parques de inovação' },
    { value: 'empresas', label: 'Empresas' },
    { value: 'faculdades', label: 'Faculdades' },
    { value: 'startups', label: 'Startups' },
    { value: 'incubadoras', label: 'Incubadoras' },
    { value: 'aceleradoras', label: 'Aceleradoras' },
    { value: 'hubs', label: 'Hubs de tecnologia' },
    { value: 'coworkings', label: 'Coworkings' },
    { value: 'investidores', label: 'Investidores' },
    { value: 'laboratorios', label: 'Laboratórios de pesquisa' },
]

export function Actors() {
    const [category, setCategory] = useState('parques')

    return (
        <>
            <PageBanner>
                <PageHeader title="Encontre Atores" />
                <CategoryFilter value={category} onChange={setCategory} options={categories} />
            </PageBanner>

            <ul className="flex flex-col gap-3">
                {mockActors.map((actor) => (
                    <li key={actor.id}>
                        <ActorCard name={actor.name} description={actor.description} />
                    </li>
                ))}
            </ul>
        </>
    )
}
