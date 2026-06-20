// Estados de carregamento/erro da tela de Eventos (Suspense + Skeleton e
// ErrorBoundary), no mesmo padrão do catálogo de atores.
//
// EventsSkeleton: placeholder da PÁGINA inteira (banner + filtro de data + grade),
// mostrado pelo <Suspense> enquanto os eventos carregam. Reusa o PageBanner real e
// o EventListSkeleton para a tela não "pular" quando os dados chegam.
// EventsError: fallback do <ErrorBoundary> caso a busca falhe, com botão de retry.

import { PageBanner } from '@/components/layout/PageBanner'
import { EventListSkeleton } from '@/features/events/components/EventList'

export function EventsSkeleton() {
    return (
        <>
            <PageBanner>
                <div className="flex animate-pulse flex-col gap-5">
                    {/* Título + busca + pílulas de categoria (mesmo formato do banner real). */}
                    <div className="h-8 w-52 rounded bg-white/15" />
                    <div className="h-12 w-full rounded-full bg-white" />
                    <div className="flex gap-2">
                        <div className="h-7 w-16 rounded-md bg-white/15" />
                        <div className="h-7 w-20 rounded-md bg-white/15" />
                        <div className="h-7 w-24 rounded-md bg-white/15" />
                        <div className="h-7 w-20 rounded-md bg-white/15" />
                    </div>
                </div>
            </PageBanner>

            {/* Filtro de data (placeholder). */}
            <div className="bg-secondary/10 h-9 w-36 animate-pulse rounded-full" />

            <EventListSkeleton count={6} />
        </>
    )
}

export function EventsError({ resetErrorBoundary }) {
    return (
        <div className="flex flex-col items-center gap-4 p-8 text-center">
            <h2 className="font-montserrat text-secondary text-xl font-extrabold">
                Não foi possível carregar os eventos
            </h2>
            <p className="text-secondary/70 text-sm">
                Ocorreu um erro ao buscar os dados. Tente novamente.
            </p>
            <button
                type="button"
                onClick={resetErrorBoundary}
                className="bg-primary text-secondary rounded-full px-4 py-2 text-sm font-bold transition active:scale-95"
            >
                Tentar novamente
            </button>
        </div>
    )
}
