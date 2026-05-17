import { cn } from '@/lib/utils'

export function PageHeader({ top, main }) {
    return (
        <header className="flex flex-col gap-2">
            <h1 className="text-secondary flex flex-col">
                {top && <span className="text-2xl">{top}</span>}
                <span className={cn('text-3xl font-extrabold', top && '-mt-1')}>{main}</span>
            </h1>

            <div aria-hidden="true" className="-mt-2 flex items-center gap-1">
                <div className="border-primary flex-1 border-t-4 border-dashed" />
                <div className="bg-primary h-4 w-4 shrink-0 rounded-full" />
            </div>
        </header>
    )
}
