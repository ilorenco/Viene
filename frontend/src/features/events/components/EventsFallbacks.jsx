// Estado de carregamento da tela de Eventos: placeholder da PÁGINA inteira (banner
// + barra de filtros + grade), mostrado pelo <Suspense> enquanto os eventos
// carregam. Mantém o formato do banner para a tela não "pular" quando os dados
// chegam. O ERRO não tem fallback por página — é tratado de forma central no
// MainLayout (componente RouteError), como nas telas do colega.

export function EventsSkeleton() {
    return (
        <>
            {/* Banner (placeholder) — mesmas bordas/medidas do banner real. */}
            <div className="bg-secondary -mx-4 flex animate-pulse flex-col gap-6 rounded-none p-6 lg:-mx-[5vw] lg:flex-row lg:items-start lg:justify-between lg:rounded-xl lg:p-8">
                <div className="flex flex-col gap-3 lg:max-w-sm">
                    <div className="h-7 w-48 rounded bg-white/15" />
                    <div className="hidden h-4 w-64 rounded bg-white/10 lg:block" />
                </div>
                <div className="flex flex-col gap-3 lg:w-[28rem]">
                    <div className="h-11 w-full rounded-full bg-white" />
                    <div className="flex gap-2">
                        <div className="h-7 w-16 rounded-lg bg-white/15" />
                        <div className="h-7 w-20 rounded-lg bg-white/15" />
                        <div className="h-7 w-16 rounded-lg bg-white/15" />
                    </div>
                </div>
            </div>

            {/* Barra de filtros (placeholder). */}
            <div className="flex animate-pulse gap-2">
                <div className="bg-secondary/10 h-9 w-32 rounded-full" />
                <div className="bg-secondary/10 h-9 w-28 rounded-full" />
                <div className="bg-secondary/10 h-9 w-28 rounded-full" />
            </div>

            {/* Grade de cards (placeholder). */}
            <ul className="grid animate-pulse grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-[3%] lg:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <li key={index} className="bg-secondary/10 h-48 rounded-2xl" />
                ))}
            </ul>
        </>
    )
}
