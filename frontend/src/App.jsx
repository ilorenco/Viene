import { QueryClientProvider } from '@tanstack/react-query'

import { AccessibilityWidget } from '@/components/accessibility/AccessibilityWidget'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'
import { queryClient } from '@/lib/queryClient'

import { AppRoutes } from './routes/AppRoutes'

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AccessibilityProvider>
                <AppRoutes />
                <AccessibilityWidget />
            </AccessibilityProvider>
        </QueryClientProvider>
    )
}
