// Hook de busca dos atores no padrão da branch do colega (React Query +
// useSuspenseQuery): o loading sobe via <Suspense> e o erro via <ErrorBoundary>,
// então este hook devolve a lista já resolvida (sem checar loading/erro na tela).
//
// Mantemos o service local listActors() (src/services/actors.js), que continua
// sendo o ponto único de troca mock -> API real (flag VITE_USE_MOCKS).

import { useSuspenseQuery } from '@tanstack/react-query'

import { listActors } from '@/features/actors/services/actors'

export function useActors() {
    return useSuspenseQuery({ queryKey: ['actors'], queryFn: listActors }).data
}
