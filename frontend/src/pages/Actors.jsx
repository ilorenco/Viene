import { useState } from 'react'

import { ActorCard } from '@/components/actors/ActorCard'
import { CategoryFilter } from '@/components/CategoryFilter'
import { FullBleed } from '@/components/layout/FullBleed'
import { PageHeader } from '@/components/layout/PageHeader'
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
            <FullBleed className="bg-secondary text-primary -mt-4 flex flex-col gap-5 px-4 py-8">
                <PageHeader main="Encontre Atores" />
                <CategoryFilter value={category} onChange={setCategory} options={categories} />
            </FullBleed>

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
