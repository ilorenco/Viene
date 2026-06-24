import { LayoutGrid, Search, Tag, UserPlus } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PageHeader } from '@/components/layout/PageHeader'
import { DraggableTrack } from '@/components/ui/DraggableTrack'
import { Pagination } from '@/components/ui/Pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { ActorList } from '@/features/actors/components/ActorList'
import { ActorsCatalogSkeleton } from '@/features/actors/components/ActorsCatalogFallbacks'
import { RegisterActorModal } from '@/features/actors/components/RegisterActorModal'
import { useFilteredActors } from '@/features/actors/hooks/useFilteredActors'
import { useGridColumns } from '@/hooks/useGridColumns'
import { usePagination } from '@/hooks/usePagination'
import { ATOR_AREA_LABELS, ATOR_AREA_OPTIONS } from '@/lib/atorTypes'
import { cn } from '@/lib/utils'

function ActorsContent() {
    const location = useLocation()
    const navigate = useNavigate()
    const [area, setArea] = useState('todos')
    const [tag, setTag] = useState('todas')
    const [search, setSearch] = useState('')
    // Abre o modal de cadastro já aberto quando se chega aqui pelo atalho do
    // Perfil (state.openRegister — ver Profile.jsx). Limpa o state na hora pra
    // um back/forward do navegador não reabrir o modal sozinho.
    const [registerOpen, setRegisterOpen] = useState(() => Boolean(location.state?.openRegister))
    useEffect(() => {
        if (location.state?.openRegister) {
            navigate(location.pathname, { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- só na primeira renderização (consome o state uma vez)
    }, [])

    // Busca + regra de filtro/tags ficam no hook (useSuspenseQuery por dentro): a
    // página recebe só a lista já filtrada e as tags disponíveis.
    const { items, tagOptions } = useFilteredActors(area, tag, search)

    // Paginação: 7 linhas (acompanha o nº de colunas).
    const columns = useGridColumns()
    const { page, setPage, totalPages, pageItems } = usePagination(items, {
        pageSize: columns * 7,
        resetKey: `${area}|${tag}|${search}`,
    })

    function selectArea(value) {
        setArea(value)
        setTag('todas') // ao trocar de área, volta a tag para "Todas"
    }

    // Busca automática (atualiza ao digitar) — o submit só evita recarregar a página.
    function submitSearch(event) {
        event.preventDefault()
    }

    // Botão de uma ÁREA. Reusado nos dois layouts: carrossel arrastável (mobile)
    // e linha que quebra (desktop). `shrink-0` evita que encolham no carrossel.
    function renderAreaButton(option) {
        return (
            <button
                key={option.value}
                type="button"
                onClick={() => selectArea(option.value)}
                aria-pressed={area === option.value}
                className={cn(
                    'shrink-0 rounded-lg px-2.5 py-2.5 text-xs font-bold transition active:scale-95 lg:px-3 lg:py-1.5',
                    area === option.value ? 'bg-primary text-secondary' : 'text-secondary bg-white',
                )}
            >
                {option.label}
            </button>
        )
    }

    return (
        <>
            {/* Banner escuro (vai de canto a canto no mobile; ~5% das bordas no
                desktop). Título + busca + botões de ÁREA. No mobile, -mt-24
                cancela o pt do <main> por completo (banner colado no header,
                igual às telas de detalhe); no desktop, lg:-mt-12 deixa metade do
                respiro da Home. */}
            <div className="bg-secondary -mx-6 -mt-24 flex flex-col gap-6 rounded-none p-6 lg:-mx-[5vw] lg:-mt-12 lg:flex-row lg:items-start lg:justify-between lg:rounded-xl lg:p-8">
                <div className="flex flex-col gap-3 lg:max-w-sm">
                    {/* Mobile: título curto + linha. Desktop: título completo + subtítulo. */}
                    <PageHeader title="Encontre Atores" className="text-white lg:hidden" />
                    <div className="hidden flex-col gap-3 lg:flex">
                        <h1 className="font-montserrat text-3xl leading-tight font-extrabold text-white lg:text-4xl">
                            Encontre Atores
                        </h1>
                        <p className="text-sm text-white/60">
                            Descubra parques, empresas, faculdades e instituições conectadas à
                            inovação e às vivências de extensão.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 lg:w-[28rem]">
                    <form
                        onSubmit={submitSearch}
                        className="flex items-center gap-2 rounded-full bg-white py-1 pr-1 pl-4 lg:py-1.5 lg:pr-1.5"
                    >
                        <Search aria-hidden="true" className="text-primary size-5 shrink-0" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Busque por ator, área ou cidade"
                            aria-label="Buscar atores"
                            className="text-secondary placeholder:text-secondary/50 w-full bg-transparent outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-secondary shrink-0 rounded-full px-5 py-1.5 text-sm font-bold transition active:scale-95 lg:py-2"
                        >
                            Buscar
                        </button>
                    </form>

                    {/* Mobile: áreas em carrossel arrastável (uma linha). No desktop as
                        áreas viram um dropdown na barra de filtros abaixo. */}
                    <div className="lg:hidden">
                        <DraggableTrack className="gap-3">
                            {ATOR_AREA_OPTIONS.map(renderAreaButton)}
                        </DraggableTrack>
                    </div>
                </div>
            </div>

            {/* Barra: dropdown de TAGS + "Cadastrar ator".
                Mobile: 2 colunas compactas (ícone em cima, texto em 2 linhas), com um
                leve recuo das bordas (px-4). Desktop: pílulas horizontais (Tags à
                esquerda, "Cadastrar" à direita). */}
            <div className="grid grid-cols-2 gap-3 px-4 lg:flex lg:items-center lg:gap-2 lg:px-0">
                {/* Dropdown de ÁREAS — só no desktop (no mobile as áreas ficam no
                    carrossel do banner). Fica à esquerda do dropdown de tags. */}
                <Select value={area} onValueChange={selectArea}>
                    <SelectTrigger className="text-secondary border-secondary/15 bg-background hidden rounded-full border px-4 py-2 text-sm font-semibold lg:flex">
                        <LayoutGrid className="text-primary size-4 shrink-0" />
                        <span className="max-w-56 truncate">
                            {area === 'todos' ? 'Todas as áreas' : ATOR_AREA_LABELS[area]}
                        </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                        {ATOR_AREA_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.value === 'todos' ? 'Todas as áreas' : option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={tag} onValueChange={setTag}>
                    <SelectTrigger
                        className={cn(
                            // mobile: ícone AO LADO do texto (linha); o chevron automático
                            // do Select fica escondido (o ícone de tag já indica o filtro).
                            'text-secondary border-secondary/15 bg-background flex items-center gap-1.5 rounded-2xl border px-2.5 py-2 text-left text-xs font-semibold [&>svg:last-of-type]:hidden',
                            // desktop: pill horizontal arredondado.
                            'lg:gap-2 lg:rounded-full lg:px-4 lg:text-sm lg:[&>svg:last-of-type]:block',
                        )}
                    >
                        <Tag className="text-primary size-[18px] shrink-0 lg:size-4" />
                        <span className="min-w-0 truncate leading-tight lg:leading-normal">
                            <SelectValue />
                        </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                        <SelectItem value="todas">Todas as tags</SelectItem>
                        {tagOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.value} ({option.count})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <button
                    type="button"
                    onClick={() => setRegisterOpen(true)}
                    className={cn(
                        'bg-primary text-secondary flex items-center justify-center gap-1.5 rounded-2xl px-2.5 py-2 text-xs font-bold shadow transition active:scale-95',
                        'lg:ml-auto lg:gap-2 lg:rounded-full lg:px-4 lg:text-sm',
                    )}
                >
                    <UserPlus className="size-5 shrink-0" />
                    <span className="min-w-0 truncate leading-tight lg:leading-normal">
                        Cadastrar ator
                    </span>
                </button>
            </div>

            <ActorList actors={pageItems} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />

            <RegisterActorModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
        </>
    )
}

// Página do catálogo: adota o padrão de conexão da branch do colega — React Query
// + Suspense (loading via Skeleton). O erro é tratado de forma CENTRAL no
// MainLayout (RouteError), então a página só precisa do <Suspense>. Quem busca os
// dados (useFilteredActors → useActors) e suspende é o ActorsContent.
export function Actors() {
    return (
        <Suspense fallback={<ActorsCatalogSkeleton />}>
            <ActorsContent />
        </Suspense>
    )
}
