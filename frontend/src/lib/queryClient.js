// Cliente do React Query (TanStack Query), no mesmo padrão da branch do colega.
// Centraliza o cache das buscas de dados. Usado pelo QueryClientProvider em main.jsx.

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 min: evita refazer a busca a cada navegação
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})
