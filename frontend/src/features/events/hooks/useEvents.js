import { useSuspenseQuery } from '@tanstack/react-query'

import { getEvents } from '@/features/events/services/events'

export function useEvents(category) {
    return useSuspenseQuery({
        queryKey: ['events', category],
        queryFn: () => getEvents(category),
    })
}
