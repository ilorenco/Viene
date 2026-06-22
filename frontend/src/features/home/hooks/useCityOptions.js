// Opções do filtro de cidade da Home "Explore!" — derivadas dos atores reais
// (mesma cache de useActors), não de uma lista fixa que ficaria desatualizada
// conforme novos atores são aprovados em cidades diferentes.

import { useActors } from '@/features/actors/hooks/useActors'

export function useCityOptions() {
    const actors = useActors()
    const cities = [...new Set(actors.map((actor) => actor.city).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
    )
    return [
        { value: 'todas', label: 'Todas as cidades' },
        ...cities.map((city) => ({ value: city, label: city })),
    ]
}
