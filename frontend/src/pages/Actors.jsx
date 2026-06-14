import { UserPlus } from 'lucide-react'
import { Suspense, useState } from 'react'

import { PageBanner } from '@/components/layout/PageBanner'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { SearchBar } from '@/components/ui/SearchBar'
import { ActorList, ActorListSkeleton } from '@/features/actors/components/ActorList'
import { RegisterActorModal } from '@/features/actors/components/RegisterActorModal'
import { useFilteredActors } from '@/features/actors/hooks/useFilteredActors'
import { mockActorCategories } from '@/features/actors/mocks/actorCategories'

function ActorsResults({ area, search }) {
    const actors = useFilteredActors(area, search)
    return <ActorList actors={actors} />
}

export function Actors() {
    const [area, setArea] = useState('todos')
    const [search, setSearch] = useState('')
    const [registerOpen, setRegisterOpen] = useState(false)

    return (
        <>
            <PageBanner>
                <div className="flex items-center justify-between gap-4">
                    <PageHeader title="Encontre Atores" className="text-white" rule={false} />
                    <Button
                        size="sm"
                        onClick={() => setRegisterOpen(true)}
                        className="flex shrink-0 items-center gap-2"
                    >
                        <UserPlus className="size-5" />
                        Cadastrar ator
                    </Button>
                </div>

                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Busque por ator, cidade ou bairro"
                />

                <CategoryFilter value={area} onChange={setArea} options={mockActorCategories} />
            </PageBanner>

            <Suspense fallback={<ActorListSkeleton />}>
                <ActorsResults area={area} search={search} />
            </Suspense>

            <RegisterActorModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
        </>
    )
}
