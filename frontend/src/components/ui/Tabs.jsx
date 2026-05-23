import { cn } from '@/lib/utils'

function TabButton({ label, value, active, onClick }) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onClick(value)}
            className="flex flex-1 flex-col items-center gap-2 pt-2"
        >
            <span className="text-2xl">{label}</span>
            <span
                aria-hidden="true"
                className={cn('h-2 w-full rounded-full', active ? 'bg-primary' : 'bg-transparent')}
            />
        </button>
    )
}

export function Tabs({ value, onChange }) {
    return (
        <div
            role="tablist"
            className="bg-secondary text-background flex overflow-hidden rounded-lg"
        >
            <TabButton
                label="EVENTOS"
                value="eventos"
                active={value === 'eventos'}
                onClick={onChange}
            />
            <TabButton
                label="ATORES"
                value="atores"
                active={value === 'atores'}
                onClick={onChange}
            />
        </div>
    )
}
