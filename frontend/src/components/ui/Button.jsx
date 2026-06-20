import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'cursor-pointer rounded-full font-extrabold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-secondary',
                danger: 'bg-danger text-background',
            },
            size: {
                sm: 'px-4 py-2 text-base',
                md: 'p-3 text-xl',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
)

export function Button({ variant, size, className, ...props }) {
    return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
