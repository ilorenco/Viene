// Card de ator do catálogo. Os cards da MESMA LINHA ficam com a mesma altura
// (h-full + o grid estica a linha até o card de maior conteúdo) e a imagem
// acompanha essa altura. No rodapé do card: a localização (Bairro, Cidade) à
// esquerda e o botão "Ver perfil" (/actors/:id) à direita. Nome e descrição
// cortam com "...".

import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ActorCard({ id, name, description, image, neighborhood, city }) {
    const location = [neighborhood, city].filter(Boolean).join(', ')

    return (
        <article className="border-secondary flex h-full w-full gap-2 rounded-lg border-2 p-2">
            {/* Imagem com link para o perfil do ator (além do botão "Ver perfil"). */}
            <Link to={`/actors/${id}`} aria-label={name} className="w-24 shrink-0 self-stretch">
                {image ? (
                    <img src={image} alt="" className="size-full rounded-md object-cover" />
                ) : (
                    <div className="bg-primary size-full rounded-md" aria-hidden="true" />
                )}
            </Link>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-secondary line-clamp-2 font-extrabold">{name}</h3>
                <p className="text-foreground line-clamp-3 text-xs">{description}</p>

                <div className="mt-auto flex items-center gap-2 pt-1">
                    {location && (
                        <p className="text-secondary/60 flex min-w-0 flex-1 items-center gap-1 text-xs">
                            <MapPin className="size-3.5 shrink-0" />
                            <span className="truncate">{location}</span>
                        </p>
                    )}
                    <Link
                        to={`/actors/${id}`}
                        className="bg-primary text-secondary ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-bold transition active:scale-95"
                    >
                        Ver perfil
                    </Link>
                </div>
            </div>
        </article>
    )
}

// Placeholder do card (mesma "casca" do ActorCard) exibido enquanto a lista
// carrega, via <Suspense> + React Query. Blocos cinza animados (animate-pulse).
export function ActorCardSkeleton() {
    return (
        <article
            aria-hidden="true"
            className="border-secondary/15 flex h-full w-full animate-pulse gap-2 rounded-lg border-2 p-2"
        >
            <div className="bg-secondary/10 w-24 shrink-0 self-stretch rounded-md" />
            <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                <div className="bg-secondary/10 h-4 w-3/4 rounded" />
                <div className="bg-secondary/10 h-3 w-full rounded" />
                <div className="bg-secondary/10 h-3 w-5/6 rounded" />
                <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <div className="bg-secondary/10 h-3 w-20 rounded" />
                    <div className="bg-secondary/10 h-6 w-16 rounded-full" />
                </div>
            </div>
        </article>
    )
}
