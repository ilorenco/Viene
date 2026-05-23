import { cn } from '@/lib/utils'

export function PageHeader({ overline, title, className }) {
    return (
        <header className={cn('flex flex-col gap-2', className)}>
            <h1 className="flex flex-col">
                {overline && <span className="text-2xl">{overline}</span>}
                <span className={cn('text-3xl font-extrabold', overline && '-mt-1')}>{title}</span>
            </h1>

            <div aria-hidden="true" className="-mt-2 flex items-center gap-1">
                <div className="border-primary flex-1 border-t-4 border-dashed" />
                <div className="bg-primary h-4 w-4 shrink-0 rounded-full" />
            </div>
        </header>
    )
}
