import { cn } from '@/lib/utils'

export function Card({ as: Component = 'div', className, ...props }) {
    return <Component className={cn('flex flex-col', className)} {...props} />
}
