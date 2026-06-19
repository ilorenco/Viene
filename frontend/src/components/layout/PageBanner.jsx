import { FullBleed } from '@/components/layout/FullBleed'

export function PageBanner({ children }) {
    return (
        <FullBleed className="bg-secondary text-primary flex flex-col gap-5 px-6 py-8">
            {children}
        </FullBleed>
    )
}
