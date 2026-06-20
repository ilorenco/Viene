// Seção "Como funciona o mapeamento" da Home: imagem à esquerda (que é um LINK para
// o mapa, com o botão "Abrir o mapa" aparecendo como LEGENDA no canto inferior
// direito da imagem) + passo a passo à direita. É o alvo do botão "Ver como usar o
// mapa" do carrossel (id="como-funciona", com scroll-mt p/ não ficar sob o header).
// A imagem é um placeholder da marca (trocar por uma real depois).

import { Map, MousePointerClick, Plus, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

const STEPS = [
    {
        icon: Map,
        title: 'Marcadores no mapa',
        text: 'Cada marcador é um ator ou evento, com a cor da sua área. Vários no mesmo ponto viram um agrupamento.',
    },
    {
        icon: MousePointerClick,
        title: 'Clique para ver detalhes',
        text: 'Toque num marcador para abrir as informações; no agrupamento, escolha um item da lista.',
    },
    {
        icon: SlidersHorizontal,
        title: 'Filtre e busque',
        text: 'Use os filtros (tipos de ator, categorias de evento, datas) e a busca para achar o que procura.',
    },
    {
        icon: Plus,
        title: 'Sugira um ponto',
        text: 'Falta algo no mapa? Sugira um novo ponto — ele passa por moderação antes de aparecer.',
    },
]

export function HomeMapGuide() {
    return (
        <section
            id="como-funciona"
            className="flex scroll-mt-24 flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8"
        >
            {/* Imagem (esquerda) — é um LINK para o mapa, com a "legenda" no canto inferior direito */}
            <div className="lg:w-[38%] lg:shrink-0">
                <Link
                    to="/map"
                    aria-label="Abrir o mapa"
                    className="bg-secondary group relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-2xl lg:aspect-auto lg:h-full"
                >
                    <div className="bg-primary/25 absolute -bottom-12 -left-12 size-48 rounded-full blur-3xl" />
                    <Map className="text-primary relative size-28" />

                    {/* Legenda (botão visual) no canto inferior direito da imagem */}
                    <span className="bg-primary text-secondary absolute right-3 bottom-3 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-lg transition group-hover:brightness-95 group-active:scale-95">
                        <Map className="size-4" />
                        Abrir o mapa
                    </span>
                </Link>
            </div>

            {/* Passo a passo (direita) */}
            <div className="flex flex-1 flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h2 className="font-montserrat text-secondary text-2xl font-extrabold lg:text-3xl">
                        Como funciona o mapeamento
                    </h2>
                    <p className="text-secondary/70 text-sm">
                        Em poucos passos você navega pelo ecossistema de inovação de Joinville.
                    </p>
                </div>

                <ol className="flex flex-col gap-4">
                    {STEPS.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <li key={step.title} className="flex gap-3">
                                <div className="bg-primary/15 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold">
                                    {i + 1}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-secondary flex items-center gap-1.5 font-bold">
                                        <Icon className="text-primary size-4 shrink-0" />
                                        {step.title}
                                    </h3>
                                    <p className="text-secondary/70 text-sm">{step.text}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
