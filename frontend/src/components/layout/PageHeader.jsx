import { cn } from '@/lib/utils'

export function PageHeader({ overline, title, className }) {
    return (
        <header className={cn('flex flex-col gap-2', className)}>
            <h1 className="flex flex-col">
                {overline && <span className="text-2xl">{overline}</span>}
                <span className={cn('text-3xl font-extrabold', overline && '-mt-1')}>{title}</span>
            </h1>
        </header>
    )
}
