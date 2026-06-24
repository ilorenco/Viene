// Página pública de Perguntas Frequentes (Ajuda). Segue o padrão do catálogo de
// atores: banner escuro com título + busca, uma barra de filtro logo abaixo e a
// lista paginada. Só o conteúdo que depende de dados (useFilteredFaqs + <Suspense>)
// suspende; o formulário de envio (QuestionForm) é uma mutação à parte e fica
// sempre visível. O erro da lista é tratado de forma CENTRAL no MainLayout.

import { ChevronDown, ChevronUp, ListFilter, Search } from 'lucide-react'
import { Suspense, useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { FaqItem } from '@/features/faq/components/FaqItem'
import { QuestionForm } from '@/features/faq/components/QuestionForm'
import { useFilteredFaqs } from '@/features/faq/hooks/useFilteredFaqs'
import { FAQ_PAGE_OPTIONS } from '@/features/faq/mocks/faqs'
import { usePagination } from '@/hooks/usePagination'

// Grade de 2 colunas x 6 linhas = 12 perguntas por página (1 coluna no mobile).
const PAGE_SIZE = 12
// Quantas perguntas aparecem antes de clicar em "Ver mais".
const COLLAPSED_COUNT = 6

function FaqContent() {
    const [category, setCategory] = useState('todas')
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState(false)

    // Busca + filtro por página ficam no hook (useSuspenseQuery por dentro): a
    // página recebe só a lista já filtrada.
    const { items } = useFilteredFaqs(category, search)

    const { page, setPage, totalPages, pageItems } = usePagination(items, {
        pageSize: PAGE_SIZE,
        resetKey: `${category}|${search}`,
    })

    // Ao trocar de filtro/busca ou de página, recolhe a lista de novo (cada página
    // começa mostrando o preview de COLLAPSED_COUNT perguntas). Padrão do React de
    // "ajustar estado durante o render" (mesma técnica do usePagination), em vez de
    // um useEffect + setState (evita o render intermediário expandido).
    const [prevResetKey, setPrevResetKey] = useState(`${category}|${search}|${page}`)
    const resetKey = `${category}|${search}|${page}`
    if (resetKey !== prevResetKey) {
        setPrevResetKey(resetKey)
        setExpanded(false)
    }

    // Busca automática (atualiza ao digitar) — o submit só evita recarregar a página.
    function submitSearch(event) {
        event.preventDefault()
    }

    // Perguntas realmente exibidas na página atual: recolhidas (preview) ou todas.
    const visibleItems = expanded ? pageItems : pageItems.slice(0, COLLAPSED_COUNT)
    const canExpand = pageItems.length > COLLAPSED_COUNT

    return (
        <>
            {/* Banner escuro (de canto a canto no mobile; recuado ~5% no desktop),
                igual ao catálogo de atores: título + descrição + busca. */}
            <div className="bg-secondary -mx-6 flex flex-col gap-6 rounded-none p-6 lg:-mx-[5vw] lg:flex-row lg:items-start lg:justify-between lg:rounded-xl lg:p-8">
                <div className="flex flex-col gap-3">
                    <PageHeader title="Perguntas Frequentes" className="text-white lg:hidden" />
                    <div className="hidden flex-col gap-3 lg:flex">
                        <h1 className="font-montserrat text-3xl leading-tight font-extrabold whitespace-nowrap text-white lg:text-4xl">
                            Perguntas Frequentes
                        </h1>
                        <p className="max-w-sm text-sm text-white/60">
                            Tire suas dúvidas sobre como usar a plataforma VIENE: mapa, eventos,
                            atores, conta e acessibilidade.
                        </p>
                    </div>
                </div>

                <div className="lg:w-[28rem]">
                    <form
                        onSubmit={submitSearch}
                        className="flex items-center gap-2 rounded-full bg-white py-1 pr-1 pl-4 lg:py-1.5 lg:pr-1.5"
                    >
                        <Search aria-hidden="true" className="text-primary size-5 shrink-0" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Busque por uma dúvida ou palavra-chave"
                            aria-label="Buscar perguntas"
                            className="text-secondary placeholder:text-secondary/50 w-full bg-transparent outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-primary text-secondary shrink-0 rounded-full px-5 py-1.5 text-sm font-bold transition active:scale-95 lg:py-2"
                        >
                            Buscar
                        </button>
                    </form>
                </div>
            </div>

            {/* Barra de filtro: dropdown "Filtrar por página" à esquerda e o botão de
                expandir à direita (respeita o espaçamento lateral do conteúdo). */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="text-secondary border-secondary/15 bg-background rounded-full border px-4 py-2 text-sm font-semibold">
                        <ListFilter className="text-primary size-4 shrink-0" />
                        <span className="max-w-56 truncate">
                            <SelectValue />
                        </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                        {FAQ_PAGE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {canExpand && (
                    <button
                        type="button"
                        onClick={() => setExpanded((value) => !value)}
                        aria-expanded={expanded}
                        className="text-secondary border-secondary/15 bg-background flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95"
                    >
                        <span>
                            {expanded ? 'Ver menos' : 'Ver mais'}
                            <span className="hidden lg:inline"> perguntas</span>
                        </span>
                        {expanded ? (
                            <ChevronUp className="text-primary size-4" />
                        ) : (
                            <ChevronDown className="text-primary size-4" />
                        )}
                    </button>
                )}
            </div>

            {/* Lista em 2 colunas (1 no mobile); itens não esticam para a altura da
                linha (items-start), então abrir uma resposta não estica a vizinha. */}
            {visibleItems.length > 0 ? (
                <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:items-start">
                    {visibleItems.map((faq) => (
                        <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
                    ))}
                </ul>
            ) : (
                <p className="text-secondary/60 rounded-2xl bg-white p-6 text-center text-sm">
                    Nenhuma pergunta encontrada para esse filtro. Tente outra página ou outra
                    palavra-chave.
                </p>
            )}

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
    )
}

// Placeholder da lista (cabeçalho + acordeões fechados em 2 colunas).
function FaqSkeleton({ count = 6 }) {
    return (
        <div className="flex animate-pulse flex-col gap-5">
            <div className="bg-secondary/80 -mx-6 h-40 rounded-none lg:-mx-[5vw] lg:h-32 lg:rounded-xl" />
            <div className="bg-secondary/10 h-9 w-44 rounded-full" />
            <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {Array.from({ length: count }).map((_, index) => (
                    <li
                        key={index}
                        className="border-secondary/10 bg-secondary/5 h-14 rounded-2xl border"
                    />
                ))}
            </ul>
        </div>
    )
}

// Adota o padrão do colega: React Query + Suspense (loading via skeleton); o erro
// é central no MainLayout. Quem busca os dados e suspende é o FaqContent. O
// QuestionForm fica fora do <Suspense> para aparecer mesmo durante o loading.
export function Faq() {
    return (
        <>
            <Suspense fallback={<FaqSkeleton />}>
                <FaqContent />
            </Suspense>

            <QuestionForm />
        </>
    )
}
