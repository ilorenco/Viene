import { Heart } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

// Esboço: estado de "favoritado" mantido em memória apenas para validar a
// interação/animação com o time. Trocar por estado vindo do backend quando pronto.
export function LikeButton({ defaultLiked = false, size = 'size-10', className, ...props }) {
    const [liked, setLiked] = useState(defaultLiked)

    return (
        <button
            type="button"
            aria-pressed={liked}
            aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            onClick={() => setLiked((prev) => !prev)}
            className={cn('shrink-0 cursor-pointer', className)}
            {...props}
        >
            <Heart
                strokeWidth={1.5}
                fill={liked ? 'currentColor' : 'none'}
                aria-hidden="true"
                className={cn(
                    'text-secondary transition-colors duration-200',
                    liked && 'animate-like-pop',
                    size,
                )}
            />
        </button>
    )
}
