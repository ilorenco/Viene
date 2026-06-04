import { useSuspenseQuery } from '@tanstack/react-query'

import { getActors } from '@/features/actors/services/actors'

export function useActors(category) {
    return useSuspenseQuery({
        queryKey: ['actors', category],
        queryFn: () => getActors(category),
    })
}
