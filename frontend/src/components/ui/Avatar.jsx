import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const avatarVariants = cva(
    'flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-secondary font-montserrat font-bold',
    {
        variants: {
            size: {
                sm: 'size-8 text-xs',
                md: 'size-14 text-lg',
                lg: 'size-20 text-2xl',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
)

function getInitials(name) {
    const words = name.trim().split(/\s+/)
    const firstInitial = words[0]?.[0] ?? ''
    const lastInitial = words.length > 1 ? (words.at(-1)?.[0] ?? '') : ''
    return (firstInitial + lastInitial).toUpperCase()
}

export function Avatar({ src, name, size, className }) {
    return (
        <span className={cn(avatarVariants({ size }), className)}>
            {src ? (
                <img src={src} alt={name ?? ''} className="size-full object-cover" />
            ) : name ? (
                getInitials(name)
            ) : null}
        </span>
    )
}
