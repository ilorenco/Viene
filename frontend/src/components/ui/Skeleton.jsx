import { cn } from '@/lib/utils'

export function Skeleton({ className }) {
    return <div className={cn('bg-secondary/10 animate-pulse rounded-md', className)} />
}
