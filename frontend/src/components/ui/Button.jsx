import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva('cursor-pointer rounded-full font-extrabold', {
    variants: {
        variant: {
            primary: 'bg-primary text-secondary',
            secondary: 'bg-secondary text-primary',
            danger: 'bg-danger text-background',
        },
        size: {
            xs: 'px-3 py-1 text-sm',
            sm: 'px-4 py-2 text-base',
            md: 'p-3 text-xl',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
})

export function Button({ asChild = false, variant, size, className, ...props }) {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
