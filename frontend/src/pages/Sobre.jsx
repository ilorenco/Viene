// Página "Sobre a Viene" — conteúdo baseado no Manual de Marca + as 4 áreas de
// atores (com as imagens e cores de cada área). Estrutura:
//   1. Hero: "CONECTANDO A INOVAÇÃO" / "SOBRE A MARCA" + texto + ícone (pino) da marca;
//   2. Dois cartões escuros: curiosidade do nome + significado do ícone;
//   3. "Missão | Visão | Valores" (texto do Manual de Marca);
//   4. Uma seção por ÁREA (imagem + texto), alternando os lados, com a cor da área.

import areaAmbientes from '@/assets/areas/area-ambientes.png'
import areaEducacao from '@/assets/areas/area-educacao.png'
import areaPrivado from '@/assets/areas/area-privado.png'
import areaPublico from '@/assets/areas/area-publico.png'
import { FullBleed } from '@/components/layout/FullBleed'
import { ATOR_AREAS } from '@/lib/atorTypes'
import { cn } from '@/lib/utils'

const intro =
    'Na Viene, conectamos empresas e ideias para transformar inovação em colaboração. Mais do que uma plataforma, a Viene simboliza o encontro entre empresas de diferentes portes que acreditam no poder das ideias compartilhadas — fortalecendo parcerias estratégicas e impulsionando projetos colaborativos, em um ambiente onde pequenas e grandes organizações podem se aproximar, participar de eventos e encontrar soluções alinhadas às suas visões de futuro.'

const mission = [
    'Promover a conexão entre empresas de diferentes portes',
    'Facilitar o acesso a oportunidades de inovação',
    'Estimular a colaboração entre organizações',
    'Criar um ambiente acessível para troca de conhecimento',
    'Impulsionar soluções conjuntas para desafios reais',
]

const vision = [
    'Tornar-se referência nacional em inovação colaborativa',
    'Expandir a rede de empresas e parceiros dentro da plataforma',
    'Ser reconhecida como ponte entre ideias e execução',
    'Fortalecer ecossistemas de inovação regional',
]

const values = [
    'Inovação — incentivar novas ideias',
    'Conexão — aproximar pessoas e empresas',
    'Acessibilidade — inovação para todos',
    'Transparência — relações claras e confiáveis',
    'Impacto — gerar resultados reais',
]

const mvv = [
    { title: 'Missão', items: mission },
    { title: 'Visão', items: vision },
    { title: 'Valores', items: values },
]

// Imagem + descrição de cada área (a cor e o nome vêm de ATOR_AREAS).
const AREA_EXTRA = {
    ambientes: {
        image: areaAmbientes,
        description:
            'Hubs de inovação, incubadoras, aceleradoras, espaços de coworking, parques tecnológicos e espaços maker. São os ambientes que conectam atores e dão o terreno para as ideias crescerem.',
    },
    privado: {
        image: areaPrivado,
        description:
            'Startups, spin-offs, empresas consolidadas, software houses e micro e pequenas empresas. É o setor que coloca a inovação no mercado e movimenta a economia da região.',
    },
    educacao: {
        image: areaEducacao,
        description:
            'Universidades e instituições de ensino superior, escolas técnicas e centros de Pesquisa e Desenvolvimento (P&D). Formam talentos e geram o conhecimento que sustenta o ecossistema.',
    },
    publico: {
        image: areaPublico,
        description:
            'Órgãos governamentais, associações e entidades de classe, agências de fomento, fundos de investimento e investidores anjo. Apoiam, financiam e dão estrutura institucional à inovação.',
    },
}

const areas = ATOR_AREAS.map((area) => ({ ...area, ...AREA_EXTRA[area.id] }))

// Traço SUPERIOR: parte da borda da janela (do lado do título) e vai até ~o meio
// do título. Mais grosso/maior. `side` = a borda de onde ele parte. A ponta de fora
// é cortada pela borda (overflow do <main>); a ponta de dentro fica arredondada.
function TopTrace({ color, side }) {
    return (
        <FullBleed>
            <div
                className={cn(
                    'h-8 w-[42%] rounded-full lg:h-10',
                    side === 'right' ? '-mr-8 ml-auto' : 'mr-auto -ml-8',
                )}
                style={{ backgroundColor: color }}
            />
        </FullBleed>
    )
}

// Traço INFERIOR: 60% da largura da janela, CENTRALIZADO, mais fino e arredondado
// (pílula com as duas pontas visíveis).
function BottomTrace({ color }) {
    return (
        <FullBleed className="flex justify-center">
            <div className="h-2.5 w-[60%] rounded-full lg:h-3" style={{ backgroundColor: color }} />
        </FullBleed>
    )
}

function MvvCard({ title, items }) {
    return (
        <div className="border-secondary/10 relative flex flex-col gap-3 rounded-2xl border bg-white p-6">
            {/* Tab laranja na lateral (detalhe do mockup) */}
            <span className="bg-primary absolute top-1/2 -left-1.5 h-16 w-3 -translate-y-1/2 rounded-full" />
            <h3 className="text-secondary font-montserrat text-xl font-extrabold">{title}</h3>
            <ul className="flex flex-col gap-2">
                {items.map((item) => (
                    <li key={item} className="text-secondary/80 flex items-start gap-2 text-sm">
                        <span className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Sobre() {
    return (
        <div className="flex flex-col gap-14 pb-8 lg:gap-20 lg:pb-12">
            {/* 1. Hero */}
            <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
                <div className="flex flex-col gap-4 lg:flex-1">
                    <div>
                        <h1 className="text-primary font-montserrat text-3xl leading-none font-extrabold lg:text-4xl">
                            CONECTANDO
                            <br />A INOVAÇÃO
                        </h1>
                        <p className="text-secondary font-montserrat mt-2 text-xl font-bold">
                            SOBRE A MARCA
                        </p>
                    </div>
                    <p className="text-secondary/80 text-sm leading-relaxed lg:text-base">
                        {intro}
                    </p>
                </div>

                {/* Composição enviada: 3 caixas cinza ao fundo + o ícone-pino da marca
                    na frente. No desktop, encosta no canto direito da tela (ultrapassa a
                    margem do conteúdo via -mr-[10vw]). O pino usa o favicon da marca. */}
                <div className="lg:-mr-[10vw] lg:flex-1">
                    <div className="relative mx-auto aspect-[13/11] w-full max-w-md lg:mr-0 lg:ml-auto lg:w-[28rem]">
                        <div className="bg-secondary/15 absolute top-0 left-1/2 h-[88%] w-[26%] -translate-x-1/2 rounded-2xl" />
                        <div className="bg-secondary/15 absolute top-[28%] left-0 h-[62%] w-[34%] rounded-2xl" />
                        <div className="bg-secondary/15 absolute top-[8%] right-0 h-[56%] w-[19%] rounded-2xl" />
                        <img
                            src="/favicon.svg"
                            alt="Ícone da Viene"
                            className="absolute top-1/2 left-1/2 h-[98%] -translate-x-1/2 -translate-y-1/2 drop-shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* 2. Cartões escuros: nome + ícone */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-secondary flex flex-col items-center gap-2 rounded-2xl p-6 text-center">
                    <h2 className="text-background font-montserrat font-bold">
                        Curiosidade sobre o Nome
                    </h2>
                    <p className="text-background/70 text-sm">
                        Viene vem de “Innoviene”, do alemão (inovar), e “Viene”, do italiano (vem).
                    </p>
                </div>
                <div className="bg-secondary flex flex-col items-center gap-2 rounded-2xl p-6 text-center">
                    <h2 className="text-background font-montserrat font-bold">
                        Por que o nosso ícone?
                    </h2>
                    <p className="text-background/70 text-sm">
                        Une o conceito de mapeamento à ideia de conexão, em um design simples e
                        memorável.
                    </p>
                </div>
            </div>

            {/* 3. Missão | Visão | Valores */}
            <section className="flex flex-col gap-6">
                <h2 className="text-primary font-montserrat text-center text-3xl font-extrabold lg:text-4xl">
                    Missão | Visão | Valores
                </h2>
                <div className="relative">
                    {/* Retângulo laranja (cor do tema) ao fundo — só no desktop. */}
                    <div
                        aria-hidden="true"
                        className="bg-primary absolute -inset-4 hidden rounded-3xl lg:block"
                    />
                    <div className="relative grid gap-5 lg:grid-cols-3">
                        {mvv.map((block) => (
                            <MvvCard key={block.title} title={block.title} items={block.items} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Seções por área: traço superior (borda → meio do título) + imagem +
                título/texto + traço inferior (60% centralizado). Alternam os lados. */}
            <div className="flex flex-col gap-12 lg:gap-16">
                {areas.map((area, index) => {
                    const imageLeft = index % 2 === 0
                    return (
                        <section key={area.id} className="flex flex-col gap-6">
                            {/* Traço de cima: parte da borda do lado do título */}
                            <TopTrace color={area.color} side={imageLeft ? 'right' : 'left'} />

                            <div
                                className={cn(
                                    'flex flex-col gap-6 lg:items-center lg:gap-12',
                                    imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse',
                                )}
                            >
                                <div className="lg:w-[28%] lg:shrink-0">
                                    <img
                                        src={area.image}
                                        alt={area.label}
                                        className="aspect-square w-full rounded-2xl object-cover"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-3">
                                    <h2
                                        className="font-montserrat text-3xl font-extrabold lg:text-4xl"
                                        style={{ color: area.color }}
                                    >
                                        {area.label}
                                    </h2>
                                    <p className="text-secondary/70 text-sm leading-relaxed lg:text-base">
                                        {area.description}
                                    </p>
                                </div>
                            </div>

                            {/* Traço de baixo: 60% da janela, centralizado */}
                            <BottomTrace color={area.color} />
                        </section>
                    )
                })}
            </div>
        </div>
    )
}
