import { Heart } from 'lucide-react'

import { useFavorite } from '@/hooks/useFavorite'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { cn } from '@/lib/utils'

// Favoritar de verdade (POST/DELETE /favoritos, ver useFavorite) — essa é a
// versão compacta usada nos carrosséis (mesmo backend do coração de
// ActorActions). `colorClass` permite usar o coração claro sobre fundos
// escuros (padrão: escuro). `entityType`/`entityId` identificam o ator/evento.
export function LikeButton({
    entityType,
    entityId,
    size = 'size-8 sm:size-10',
    colorClass = 'text-secondary',
    className,
    ...props
}) {
    // Favoritar exige login: sem conta, requireAuth leva ao /login.
    const { requireAuth } = useRequireAuth()
    const { isFavorited, toggle } = useFavorite(entityType, entityId)

    function handleClick(event) {
        // Evita que o clique no coração dispare a navegação do card (quando o
        // botão fica sobre/junto de um Link) e exige login antes de favoritar.
        event.preventDefault()
        event.stopPropagation()
        requireAuth(toggle)
    }

    return (
        <button
            type="button"
            aria-pressed={isFavorited}
            aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            onClick={handleClick}
            className={cn('shrink-0 cursor-pointer', className)}
            {...props}
        >
            <Heart
                strokeWidth={1.5}
                fill={isFavorited ? 'currentColor' : 'none'}
                aria-hidden="true"
                className={cn(
                    'transition-colors duration-200',
                    colorClass,
                    isFavorited && 'animate-like-pop',
                    size,
                )}
            />
        </button>
    )
}
