// Carrossel de apresentação do topo da Home: 3 temas (Sobre / Como funciona /
// Dúvidas). Posições FIXAS (não "pulam" conforme o tamanho do texto): título no
// canto superior-esquerdo, setas ‹ › no canto superior-direito (ao lado da imagem),
// botão no canto inferior-direito (ao lado da imagem). À direita, imagem quadrada
// com a barra de progresso (dots) em cima. Imagens são placeholders da marca.

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import comoFuncionaCarousel from '@/assets/home/como-funciona-carousel.png'
import faqCarousel from '@/assets/home/faq-carousel.png'
import sobreCarousel from '@/assets/home/sobre-carousel.png'
import { cn } from '@/lib/utils'

const SLIDES = [
    {
        key: 'sobre',
        image: sobreCarousel,
        title: 'Sobre o Viene',
        text: 'O Viene mapeia o ecossistema de inovação da região de Joinville: parques tecnológicos, startups, universidades, investidores e instituições — tudo num só lugar. Descubra quem move a inovação por aqui e como tudo se conecta.',
        cta: { label: 'Conhecer o Viene', to: '/sobre' },
    },
    {
        key: 'como',
        image: comoFuncionaCarousel,
        title: 'Como funciona?',
        text: 'Tudo gira em torno de um mapa interativo. Cada marcador é um ator ou evento do ecossistema, com a cor da sua área. Clique para ver os detalhes, filtre por tipo e encontre conexões.',
        cta: { label: 'Ver como usar o mapa', scrollTo: 'como-funciona' },
    },
    {
        key: 'duvidas',
        image: faqCarousel,
        title: 'Ainda ficou com dúvidas?',
        text: 'Na Central de Ajuda você encontra as perguntas mais frequentes sobre a plataforma — e, se precisar, pode enviar a sua dúvida direto para a equipe.',
        cta: { label: 'Ir para a Ajuda', to: '/ajuda' },
    },
]

const ARROW_CLASS =
    'border-secondary/15 text-secondary hover:border-primary hover:text-primary flex size-9 shrink-0 items-center justify-center rounded-full border transition active:scale-90'
const CTA_CLASS =
    'bg-primary text-secondary flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition active:scale-95'

function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function HomeIntroCarousel() {
    const [index, setIndex] = useState(0)
    const slide = SLIDES[index]
    const go = (delta) => setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length)

    return (
        <section className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-8">
            {/* Esquerda: título (topo-esq.), setas (topo-dir.), texto e botão (inferior-dir.).
                A coluna estica até a altura da imagem (lg:items-stretch) e o texto ocupa o
                meio (flex-1), então título/setas/botão ficam FIXOS — não dependem do tamanho
                do texto. No mobile, um min-h dá a mesma âncora (a coluna não estica). */}
            <div className="flex min-h-[15rem] flex-1 flex-col gap-4 lg:min-h-0">
                {/* Linha de cima: título à esquerda + setas à direita (ao lado da imagem) */}
                <div className="flex items-start justify-between gap-4">
                    <h1 className="font-montserrat text-secondary text-3xl font-extrabold lg:text-4xl">
                        {slide.title}
                    </h1>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label="Tema anterior"
                            className={ARROW_CLASS}
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label="Próximo tema"
                            className={ARROW_CLASS}
                        >
                            <ChevronRight className="size-5" />
                        </button>
                    </div>
                </div>

                {/* Texto ocupa o meio (flex-1): absorve a diferença de tamanho entre os
                    slides e empurra o botão sempre para o fundo. */}
                <p className="text-secondary/70 flex-1 text-sm leading-relaxed lg:text-base">
                    {slide.text}
                </p>

                {/* Botão fixo no canto inferior direito (ao lado da imagem) */}
                <div className="flex justify-end">
                    {slide.cta.to ? (
                        <Link to={slide.cta.to} className={CTA_CLASS}>
                            {slide.cta.label}
                            <ArrowRight className="size-4" />
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={() => scrollToId(slide.cta.scrollTo)}
                            className={CTA_CLASS}
                        >
                            {slide.cta.label}
                            <ArrowRight className="size-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Direita: imagem quadrada com a barra de progresso (dots) EM CIMA */}
            <div className="lg:w-[42%] lg:shrink-0">
                <div className="bg-secondary relative flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-2xl lg:aspect-[5/3]">
                    {/* Imagem de fundo */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 size-full object-cover"
                    />

                    {/* Barra de progresso (dots) sobre o topo da imagem */}
                    <div className="absolute inset-x-0 top-0 z-10 flex justify-center gap-1.5 p-3">
                        {SLIDES.map((item, i) => (
                            <button
                                key={item.key}
                                type="button"
                                aria-label={`Ir para "${item.title}"`}
                                aria-current={i === index}
                                onClick={() => setIndex(i)}
                                className={cn(
                                    'h-1.5 rounded-full transition-all',
                                    i === index ? 'bg-primary w-6' : 'w-2.5 bg-white/40',
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
