// Home. Três partes, com bastante respiro entre elas: (1) carrossel de
// APRESENTAÇÃO; (2) "Explore!" (fundo escuro, filtros + carrosséis de eventos e
// atores, busca via React Query + Suspense — dentro do HomeExplore); (3) "Como
// funciona o mapeamento" (passo a passo). Erro central no MainLayout.

import { HomeExplore } from '@/features/home/components/HomeExplore'
import { HomeIntroCarousel } from '@/features/home/components/HomeIntroCarousel'
import { HomeMapGuide } from '@/features/home/components/HomeMapGuide'

export function Home() {
    return (
        <div className="flex flex-col gap-10 pb-8 lg:gap-16 lg:pb-12">
            <HomeIntroCarousel />
            <HomeExplore />
            <HomeMapGuide />
        </div>
    )
}
