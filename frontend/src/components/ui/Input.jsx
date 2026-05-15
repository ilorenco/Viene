import { cn } from '../../lib/utils'

export function Input({ type = 'text', className, ...props }) {
    return (
        <input
            type={type}
            className={cn(
                'border-secondary text-secondary placeholder:text-secondary/60 w-full rounded-full border-2 bg-transparent px-6 py-4',
                className,
            )}
            {...props}
        />
    )
}
