// Estado de carregamento do Detalhe do Evento: placeholder (banner + imagem +
// infos) mostrado pelo <Suspense> enquanto o evento carrega. Mesmo formato da
// tela atual (banner pequeno de navegação + imagem quadrada à esquerda/infos à
// direita — ver EventDetails.jsx), espelhando ActorProfileSkeleton (página
// gêmea). O ERRO não tem fallback por página — é tratado de forma central no
// MainLayout (RouteError), como nas telas do colega.

import { FullBleed } from '@/components/layout/FullBleed'

export function EventDetailsSkeleton() {
    return (
        <>
            <FullBleed className="bg-secondary -mt-4 animate-pulse">
                <div className="flex flex-col gap-4 px-4 py-7 lg:px-[10%]">
                    <div className="h-8 w-24 rounded-full bg-white/15" />
                    <div className="h-4 w-32 rounded bg-white/10" />
                </div>
            </FullBleed>

            <div className="flex animate-pulse flex-col gap-5 lg:flex-row lg:gap-8">
                <div className="bg-secondary/10 aspect-square w-full rounded-2xl lg:w-80 lg:shrink-0" />
                <div className="flex flex-1 flex-col gap-3">
                    <div className="bg-secondary/10 h-8 w-2/3 rounded" />
                    <div className="bg-secondary/10 h-6 w-32 rounded-full" />
                    <div className="flex flex-col gap-2 pt-1">
                        <div className="bg-secondary/10 h-4 w-1/2 rounded" />
                        <div className="bg-secondary/10 h-4 w-1/3 rounded" />
                        <div className="bg-secondary/10 h-4 w-2/3 rounded" />
                    </div>
                    <div className="bg-secondary/10 h-4 w-full rounded" />
                    <div className="bg-secondary/10 h-4 w-5/6 rounded" />
                </div>
            </div>
        </>
    )
}
