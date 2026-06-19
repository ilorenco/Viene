// Controles de paginação reutilizáveis (números + anterior/próxima).
// Não renderiza nada quando há só uma página.

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

// Monta a sequência de páginas a mostrar; usa reticências quando há muitas.
// Ex.: (página 5, total 10) => [1, '…', 4, 5, 6, '…', 10]
function buildRange(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

    const pages = [1]
    const left = Math.max(2, current - 1)
    const right = Math.min(total - 1, current + 1)
    if (left > 2) pages.push('…')
    for (let i = left; i <= right; i += 1) pages.push(i)
    if (right < total - 1) pages.push('…')
    pages.push(total)
    return pages
}

const arrowClass =
    'text-secondary flex size-9 cursor-pointer items-center justify-center rounded-full transition active:scale-90 disabled:cursor-not-allowed disabled:opacity-40'

export function Pagination({ page, totalPages, onChange, className }) {
    if (totalPages <= 1) return null

    return (
        <nav
            aria-label="Paginação"
            className={cn('flex items-center justify-center gap-1.5', className)}
        >
            <button
                type="button"
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                aria-label="Página anterior"
                className={arrowClass}
            >
                <ChevronLeft className="size-5" />
            </button>

            {buildRange(page, totalPages).map((item, index) =>
                item === '…' ? (
                    <span
                        key={`gap-${index}`}
                        aria-hidden="true"
                        className="text-secondary/50 px-1 select-none"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onChange(item)}
                        aria-current={item === page ? 'page' : undefined}
                        aria-label={`Página ${item}`}
                        className={cn(
                            'flex size-9 cursor-pointer items-center justify-center rounded-full text-sm font-bold transition active:scale-90',
                            item === page
                                ? 'bg-primary text-secondary'
                                : 'text-secondary bg-secondary/10 hover:bg-secondary/20',
                        )}
                    >
                        {item}
                    </button>
                ),
            )}

            <button
                type="button"
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Próxima página"
                className={arrowClass}
            >
                <ChevronRight className="size-5" />
            </button>
        </nav>
    )
}
