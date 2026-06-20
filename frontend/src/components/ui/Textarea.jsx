import { cn } from '@/lib/utils'

export function Textarea({ className, rows = 4, ...props }) {
    return (
        <textarea
            rows={rows}
            className={cn(
                'border-secondary text-secondary placeholder:text-secondary/60 w-full resize-none rounded-2xl border-2 bg-transparent px-4 py-3',
                className,
            )}
            {...props}
        />
    )
}
