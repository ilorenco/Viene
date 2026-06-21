import { Heart } from 'lucide-react'
import { useState } from 'react'

import { useRequireAuth } from '@/hooks/useRequireAuth'
import { cn } from '@/lib/utils'

// Esboço: estado de "favoritado" mantido em memória apenas para validar a
// interação/animação com o time. Trocar por estado vindo do backend quando pronto.
// `colorClass` permite usar o coração claro sobre fundos escuros (padrão: escuro).
export function LikeButton({
    defaultLiked = false,
    size = 'size-8 sm:size-10',
    colorClass = 'text-secondary',
    className,
    ...props
}) {
    // Favoritar exige login: sem conta, requireAuth leva ao /login.
    const { requireAuth } = useRequireAuth()
    const [liked, setLiked] = useState(defaultLiked)

    function handleClick(event) {
        // Evita que o clique no coração dispare a navegação do card (quando o
        // botão fica sobre/junto de um Link) e exige login antes de favoritar.
        event.preventDefault()
        event.stopPropagation()
        requireAuth(() => setLiked((prev) => !prev))
    }

    return (
        <button
            type="button"
            aria-pressed={liked}
            aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            onClick={handleClick}
            className={cn('shrink-0 cursor-pointer', className)}
            {...props}
        >
            <Heart
                strokeWidth={1.5}
                fill={liked ? 'currentColor' : 'none'}
                aria-hidden="true"
                className={cn(
                    'transition-colors duration-200',
                    colorClass,
                    liked && 'animate-like-pop',
                    size,
                )}
            />
        </button>
    )
}
