// Estado de carregamento do Detalhe do Evento: placeholder (banner + título + meta
// + seções) mostrado pelo <Suspense> enquanto o evento carrega. Mantém o formato da
// tela para não "pular" quando os dados chegam. O ERRO não tem fallback por página —
// é tratado de forma central no MainLayout (RouteError), como nas telas do colega.

import { FullBleed } from '@/components/layout/FullBleed'

export function EventDetailsSkeleton() {
    return (
        <>
            <FullBleed className="bg-secondary/10 h-56 animate-pulse" />

            <header className="flex animate-pulse flex-col gap-4">
                <div className="bg-secondary/10 h-8 w-3/4 rounded" />
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-secondary/10 size-6 shrink-0 rounded" />
                        <div className="bg-secondary/10 h-3 w-2/3 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-secondary/10 size-6 shrink-0 rounded" />
                        <div className="bg-secondary/10 h-3 w-1/2 rounded" />
                    </div>
                </div>
                <div className="bg-primary/30 h-1 w-full rounded-full" />
            </header>

            <section className="flex animate-pulse flex-col gap-2">
                <div className="bg-secondary/10 h-5 w-44 rounded" />
                <div className="bg-secondary/10 h-3 w-full rounded" />
                <div className="bg-secondary/10 h-3 w-5/6 rounded" />
            </section>

            <section className="flex animate-pulse flex-col gap-2">
                <div className="bg-secondary/10 h-5 w-44 rounded" />
                <div className="bg-secondary/10 h-3 w-full rounded" />
                <div className="bg-secondary/10 h-3 w-3/4 rounded" />
            </section>
        </>
    )
}
