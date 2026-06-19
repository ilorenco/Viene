import { EventFiltersProvider } from './contexts/EventFiltersContext'
import { AccessibilityProvider } from './features/accessibility/AccessibilityContext'
import { AccessibilityWidget } from './features/accessibility/components/AccessibilityWidget'
import { AppRoutes } from './routes/AppRoutes'

export function App() {
    return (
        <AccessibilityProvider>
            <EventFiltersProvider>
                <AppRoutes />
            </EventFiltersProvider>
            <AccessibilityWidget />
        </AccessibilityProvider>
    )
}
