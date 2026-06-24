import { FullBleed } from '@/components/layout/FullBleed'

export function PageBanner({ children }) {
    // -mt-24 cancela o pt do <main> (hero de topo) — ver MainLayout.
    return (
        <FullBleed className="bg-secondary text-primary -mt-24 flex flex-col gap-5 px-4 py-8">
            {children}
        </FullBleed>
    )
}
