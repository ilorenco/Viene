// Favoritos (eventos / atores). Estrutura no estilo dos catálogos:
//   1. Banner escuro com título + busca (igual ao catálogo de atores/eventos);
//   2. Dois botões (Eventos / Atores) no estilo dos cartões da aba "Plataforma" do
//      admin, para escolher o que ver;
//   3. Abaixo, os MESMOS filtros e os MESMOS cards do catálogo correspondente
//      (painéis em features/favorites).
//
// A busca fica no banner (compartilhada) e é repassada ao painel ativo; cada painel
// cuida dos próprios filtros (área/tag ou categoria/data). Só os painéis buscam
// dados (useSuspenseQuery por dentro dos hooks de filtro), então só eles ficam sob
// o <Suspense>; o banner e os botões aparecem na hora. O erro é central no MainLayout.

import { CalendarDays, Search, Users } from 'lucide-react'
import { Suspense, useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { FavoriteActorsPanel } from '@/features/favorites/components/FavoriteActorsPanel'
import { FavoriteEventsPanel } from '@/features/favorites/components/FavoriteEventsPanel'
import { cn } from '@/lib/utils'

const TABS = [
    { value: 'eventos', label: 'Eventos', icon: CalendarDays },
    { value: 'atores', label: 'Atores', icon: Users },
]

// Placeholder dos cards, exibido pelo <Suspense> ao trocar de aba / carregar.
function FavoritesPanelSkeleton({ count = 6 }) {
    return (
        <div className="flex animate-pulse flex-col gap-5">
            <div className="bg-secondary/10 h-9 w-40 rounded-full" />
            <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-[3%] lg:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: count }).map((_, index) => (
                    <li key={index} className="bg-secondary/10 h-48 rounded-2xl" />
                ))}
            </ul>
        </div>
    )
}

export function Favorites() {
    const [tab, setTab] = useState('eventos')
    const [search, setSearch] = useState('')

    const isEvents = tab === 'eventos'

    // Busca automática (atualiza ao digitar) — o submit só evita recarregar a página.
    function submitSearch(event) {
        event.preventDefault()
    }

    return (
        <>
            {/* Banner escuro no estilo dos catálogos: título + descrição à esquerda,
                busca à direita (placeholder muda conforme a aba ativa). */}
            <div className="bg-secondary -mx-4 flex flex-col gap-6 rounded-none p-6 lg:-mx-[5vw] lg:flex-row lg:items-start lg:justify-between lg:rounded-xl lg:p-8">
                <div className="flex flex-col gap-3">
                    <PageHeader title="Meus Favoritos" className="text-white lg:hidden" />
                    <div className="hidden flex-col gap-3 lg:flex">
                        <h1 className="font-montserrat text-3xl leading-tight font-extrabold whitespace-nowrap text-white lg:text-4xl">
                            Meus Favoritos
                        </h1>
                        <p className="max-w-md text-sm text-white/60">
                            Seus eventos e atores salvos, reunidos em um só lugar.
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
                            placeholder={
                                isEvents
                                    ? 'Busque por nome, local ou instituição'
                                    : 'Busque por ator, área ou cidade'
                            }
                            aria-label={isEvents ? 'Buscar eventos' : 'Buscar atores'}
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

            {/* Botões Eventos / Atores (cartões com ícone + borda, como a aba
                "Plataforma" do admin). */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {TABS.map(({ value, label, icon: Icon }) => {
                    const isActive = tab === value
                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setTab(value)}
                            aria-pressed={isActive}
                            className={cn(
                                'flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-3 text-sm font-semibold transition active:scale-95',
                                isActive
                                    ? 'border-primary bg-primary/10 text-secondary'
                                    : 'border-secondary/15 text-secondary/60 hover:border-secondary/30',
                            )}
                        >
                            <Icon
                                className={cn(
                                    'size-5',
                                    isActive ? 'text-primary' : 'text-secondary/50',
                                )}
                            />
                            {label}
                        </button>
                    )
                })}
            </div>

            {/* Painel da aba ativa: mesmos filtros + cards do catálogo correspondente.
                A `key` reinicia o <Suspense> ao trocar de aba (cada painel monta limpo). */}
            <Suspense key={tab} fallback={<FavoritesPanelSkeleton />}>
                {isEvents ? (
                    <FavoriteEventsPanel search={search} />
                ) : (
                    <FavoriteActorsPanel search={search} />
                )}
            </Suspense>
        </>
    )
}
