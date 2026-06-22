// Hook de busca dos atores no padrão da branch do colega (React Query +
// useSuspenseQuery): o loading sobe via <Suspense> e o erro via <ErrorBoundary>,
// então este hook devolve a lista já resolvida (sem checar loading/erro na tela).

import { useSuspenseQuery } from '@tanstack/react-query'

import { listActors } from '@/features/actors/services/actors'

export function useActors() {
    return useSuspenseQuery({ queryKey: ['actors'], queryFn: listActors }).data
}
