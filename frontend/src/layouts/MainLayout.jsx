import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { RouteError } from '@/components/feedback/RouteError'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-5 px-4 pb-4">
                <QueryErrorResetBoundary>
                    {({ reset }) => (
                        <ErrorBoundary onReset={reset} FallbackComponent={RouteError}>
                            <Outlet />
                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
            </main>
            <Footer />
        </div>
    )
}
