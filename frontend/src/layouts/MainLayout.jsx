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
            {/* Tratamento de erro CENTRAL (padrão da branch do colega): qualquer
                página que falhe ao carregar (React Query + Suspense) cai no
                <ErrorBoundary> e mostra o <RouteError>. Assim cada página migrada
                só precisa do seu <Suspense> — não repete o boundary. */}
            <main className="flex flex-1 flex-col gap-5 overflow-x-hidden px-4 pt-4 pb-4 lg:px-[10%]">
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
