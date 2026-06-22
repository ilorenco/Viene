// Peças de layout compartilhadas entre o Perfil e os resumos com dados reais
// (ProfileStats, FavoritesSummary, EventHistorySummary) — extraídas de
// Profile.jsx pra evitar duplicar a mesma marcação/estilo em cada um.

import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Lista de cartões brancos compartilhada pelas seções de listas.
export const listClass =
    'border-secondary/10 divide-secondary/10 overflow-hidden rounded-2xl border bg-white text-sm'

// Cabeçalho de seção no MESMO padrão da tela de Configurações: título (montserrat,
// grande) + descrição opcional à esquerda e uma ação opcional à direita (ex.: o
// botão "Salvar" das Configurações; aqui, "Ver todos" / "Editar").
export function Section({ title, description, action, children }) {
    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-secondary font-montserrat text-xl font-extrabold">
                        {title}
                    </h2>
                    {description && <p className="text-secondary/60 text-sm">{description}</p>}
                </div>
                {action}
            </div>
            {children}
        </section>
    )
}

// Link "Ver todos" usado como ação à direita das seções de listas.
export function SeeAll({ to }) {
    return (
        <Link
            to={to}
            className="text-primary flex shrink-0 items-center gap-0.5 text-sm font-medium"
        >
            Ver todos <ChevronRight className="size-4" />
        </Link>
    )
}

export function CollectionItem({ icon: Icon, title, description, to, meta }) {
    return (
        <li>
            <Link to={to} className="flex items-center gap-3 p-4">
                <div className="bg-primary/10 text-primary shrink-0 rounded-full p-3">
                    <Icon className="size-6" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="text-secondary font-bold">{title}</p>
                    <p className="text-secondary/50 text-xs leading-tight">{description}</p>
                </div>
                {meta && <span className="text-secondary/50 shrink-0 text-xs">{meta}</span>}
                <ChevronRight className="text-secondary/70 size-5 shrink-0" />
            </Link>
        </li>
    )
}
