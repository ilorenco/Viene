import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
    {
        variants: {
            variant: {
                primary: 'bg-primary/15 text-primary',
                secondary: 'bg-secondary/10 text-secondary',
                success: 'bg-green-100 text-green-700',
                danger: 'bg-danger/15 text-danger',
                neutral: 'bg-secondary/10 text-secondary/70',
            },
        },
        defaultVariants: {
            variant: 'neutral',
        },
    },
)

export function Badge({ variant, className, ...props }) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
