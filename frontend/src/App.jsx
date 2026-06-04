import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/queryClient'

import { AppRoutes } from './routes/AppRoutes'

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
        </QueryClientProvider>
    )
}
