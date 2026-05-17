import { cn } from '@/lib/utils'

export function FullBleed({ className, ...props }) {
    return <div className={cn('-mx-4', className)} {...props} />
}
