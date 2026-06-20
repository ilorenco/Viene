import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

import { StopReadingOnNavigate } from '@/components/accessibility/StopReadingOnNavigate'
import { RouteError } from '@/components/feedback/RouteError'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <StopReadingOnNavigate />
            <Header />
            {/* p-4 dá respiro ao conteúdo abaixo do header sticky. Porém heros
                full-bleed de topo (PageBanner, Map, EventDetails) precisam cancelar o
                padding do topo com -mt-4. TODO: pensar num padrão melhor no futuro
                (ex.: um componente <TopHero> que já embuta -mx-4 -mt-4). */}
            <main className="flex flex-1 flex-col gap-5 p-4">
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
