// Hook de busca dos eventos no padrão da branch do colega (React Query +
// useSuspenseQuery): o loading sobe via <Suspense> e o erro via <ErrorBoundary>,
// então este hook devolve a lista já resolvida (sem checar loading/erro na tela).

import { useSuspenseQuery } from '@tanstack/react-query'

import { listEvents } from '@/features/events/services/events'

export function useEvents() {
    return useSuspenseQuery({ queryKey: ['events'], queryFn: listEvents }).data
}
