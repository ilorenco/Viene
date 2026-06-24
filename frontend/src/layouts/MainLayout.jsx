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
            {/* Tratamento de erro CENTRAL: qualquer página que falhe ao carregar
                (React Query + Suspense) cai no <ErrorBoundary> e mostra o
                <RouteError> — cada página só precisa do seu <Suspense>, sem repetir
                o boundary. pt-24 (6rem) dá respiro abaixo do header sticky; heros
                full-bleed de topo (PageBanner, Map, EventDetails) cancelam esse
                respiro com -mt-24, ficando colados no header. O respiro ANTES do
                rodapé não é daqui — é o padding-top do próprio <Footer> (mesma
                distância em toda página, independente do que a página termina
                renderizando). */}
            <main className="flex flex-1 flex-col gap-5 overflow-x-hidden px-6 pt-24 lg:px-[10%]">
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
