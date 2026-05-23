import { FullBleed } from '@/components/layout/FullBleed'

export function PageBanner({ children }) {
    return (
        <FullBleed className="bg-secondary text-primary flex flex-col gap-5 px-4 py-8">
            {children}
        </FullBleed>
    )
}
