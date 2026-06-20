// Estados de carregamento/erro do Mapa, no mesmo padrão do catálogo de atores
// (Suspense + Skeleton e ErrorBoundary).
//
// MapSkeleton: placeholder da ÁREA do mapa (abaixo da navbar), mostrado pelo
// <Suspense> enquanto atores e eventos carregam. Preenche a altura (flex-1) e
// esboça os controles flutuantes para a tela não "pular" quando os dados chegam.
// MapError: fallback do <ErrorBoundary> caso a busca falhe (ex.: ligado à API
// real), com botão para tentar de novo.

export function MapSkeleton() {
    return (
        <div className="bg-secondary/5 relative flex-1 animate-pulse overflow-hidden">
            {/* Lista lateral (desktop) à esquerda. */}
            <div className="bg-secondary/10 absolute top-3 left-3 hidden h-72 w-72 rounded-2xl lg:block" />
            {/* Botão/painel de filtros à direita. */}
            <div className="bg-secondary/10 absolute top-3 right-3 h-10 w-28 rounded-full" />
            {/* Controles de zoom/localização (canto inferior direito). */}
            <div className="absolute right-3 bottom-3 flex flex-col gap-2">
                <div className="bg-secondary/10 size-10 rounded-full" />
                <div className="bg-secondary/10 size-10 rounded-full" />
                <div className="bg-secondary/10 size-10 rounded-full" />
            </div>
            {/* Alça da gaveta inferior (mobile). */}
            <div className="bg-secondary/10 absolute bottom-3 left-1/2 h-12 w-40 -translate-x-1/2 rounded-full lg:hidden" />
        </div>
    )
}

export function MapError({ resetErrorBoundary }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <h2 className="font-montserrat text-secondary text-xl font-extrabold">
                Não foi possível carregar o mapa
            </h2>
            <p className="text-secondary/70 text-sm">
                Ocorreu um erro ao buscar os pontos do mapa. Tente novamente.
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
