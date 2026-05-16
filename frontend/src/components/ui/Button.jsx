import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva('cursor-pointer rounded-full p-3 text-xl font-extrabold', {
    variants: {
        variant: {
            primary: 'bg-primary text-secondary',
            danger: 'bg-danger text-background',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
})

export function Button({ variant, className, ...props }) {
    return <button className={cn(buttonVariants({ variant }), className)} {...props} />
}
