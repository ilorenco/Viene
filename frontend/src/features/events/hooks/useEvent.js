import { useSuspenseQuery } from '@tanstack/react-query'

import { getEventById } from '@/features/events/services/events'

export function useEvent(id) {
    return useSuspenseQuery({
        queryKey: ['event', id],
        queryFn: () => getEventById(id),
    })
}
