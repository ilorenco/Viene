// Hook de busca dos eventos no padrão da branch do colega (React Query +
// useSuspenseQuery): o loading sobe via <Suspense> e o erro via <ErrorBoundary>,
// então este hook devolve a lista já resolvida (sem checar loading/erro na tela).
//
// Mantemos o service local listEvents() (src/services/events.js), que segue sendo
// o ponto único de troca mock -> API real (flag VITE_USE_MOCKS).

import { useSuspenseQuery } from '@tanstack/react-query'

import { listEvents } from '@/features/events/services/events'

export function useEvents() {
    return useSuspenseQuery({ queryKey: ['events'], queryFn: listEvents }).data
}
