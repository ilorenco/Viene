import { QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from '@/contexts/AuthContext'
import { EventFiltersProvider } from '@/contexts/EventFiltersContext'
import { AccessibilityProvider } from '@/features/accessibility/AccessibilityContext'
import { AccessibilityWidget } from '@/features/accessibility/components/AccessibilityWidget'
import { queryClient } from '@/lib/queryClient'

import { AppRoutes } from './routes/AppRoutes'

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AccessibilityProvider>
                <AuthProvider>
                    <EventFiltersProvider>
                        <AppRoutes />
                    </EventFiltersProvider>
                    <AccessibilityWidget />
                </AuthProvider>
            </AccessibilityProvider>
        </QueryClientProvider>
    )
}
