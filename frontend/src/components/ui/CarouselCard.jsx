// Card dos carrosséis da Home (eventos e atores) — mesmo formato nos dois, em cores
// CLARAS (a seção "Explore!" tem fundo escuro). O LINK fica SÓ na imagem (bloco),
// então o texto do título continua selecionável/copiável.

import { Link } from 'react-router-dom'

import { LikeButton } from '@/components/ui/LikeButton'

export function CarouselCard({ to, title, entityType, entityId }) {
    return (
        <article className="flex w-72 shrink-0 flex-col gap-2">
            {/* Link apenas na imagem (permite copiar o título). */}
            <Link to={to} aria-label={title} className="block">
                <div className="bg-primary h-32 rounded-md" />
            </Link>

            <div className="flex items-center justify-between gap-2 pl-2">
                <h3 className="font-montserrat text-background line-clamp-2 text-sm font-extrabold">
                    {title}
                </h3>
                <LikeButton
                    entityType={entityType}
                    entityId={entityId}
                    size="size-5 sm:size-6"
                    colorClass="text-background"
                />
            </div>
        </article>
    )
}
