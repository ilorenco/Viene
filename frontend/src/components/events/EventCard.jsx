import { Heart } from 'lucide-react'

import { Card } from '../ui/Card'

export function EventCard({ title }) {
    return (
        <Card as="article" className="w-72 shrink-0 gap-2">
            <div className="bg-primary h-32 rounded-md" />

            <div className="flex items-center justify-between pl-2">
                <h3 className="font-montserrat text-secondary line-clamp-2 w-2/3 text-sm font-extrabold">
                    {title}
                </h3>
                <button type="button" aria-label="Favoritar">
                    <Heart size={38} strokeWidth={1.5} className="text-secondary" />
                </button>
            </div>
        </Card>
    )
}
