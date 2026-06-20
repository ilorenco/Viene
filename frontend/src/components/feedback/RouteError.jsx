// Fallback central de erro de rota (usado no MainLayout). Mesmo papel do
// RouteError da branch do colega: quando uma página (React Query + Suspense) falha
// ao carregar, o <ErrorBoundary> do MainLayout mostra esta tela, com um botão
// "Tentar novamente" (resetErrorBoundary refaz a query) e um atalho para o início.

import { Link } from 'react-router-dom'

import errorIllustration from '@/assets/errors/something-went-wrong.png'

export function RouteError({ resetErrorBoundary }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <img src={errorIllustration} alt="" className="w-full max-w-64" />

            <h1 className="font-montserrat text-secondary text-2xl font-bold">Algo deu errado</h1>

            <p className="text-secondary max-w-xs text-sm">
                Não foi possível carregar este conteúdo. Tente novamente.
            </p>

            <div className="flex w-full max-w-xs flex-col gap-3">
                <button
                    type="button"
                    onClick={resetErrorBoundary}
                    className="bg-primary text-background rounded-full px-4 py-2 text-base font-bold transition active:scale-95"
                >
                    Tentar novamente
                </button>

                <Link
                    to="/"
                    className="border-secondary/15 text-secondary rounded-full border px-4 py-2 text-base font-bold transition active:scale-95"
                >
                    Ir para o início
                </Link>
            </div>
        </div>
    )
}
