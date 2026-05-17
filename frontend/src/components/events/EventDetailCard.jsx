import { Clock, Heart, MapPin } from 'lucide-react'

import { Card } from '@/components/ui/Card'

export function EventDetailCard({ title, address, datetime }) {
    return (
        <Card as="article" className="border-secondary w-full gap-3 rounded-lg border-2 p-3">
            <div className="bg-primary relative h-48 rounded-md">
                <h3 className="font-montserrat text-secondary absolute bottom-3 left-3 text-xl font-extrabold">
                    {title}
                </h3>
            </div>

            <div className="text-secondary flex items-end justify-between gap-3">
                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-start gap-2">
                        <MapPin size={25} aria-hidden="true" className="text-foreground shrink-0" />
                        <span>{address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <Clock size={25} aria-hidden="true" className="text-foreground shrink-0" />
                        <span>{datetime}</span>
                    </div>
                </div>

                <button type="button" aria-label="Favoritar" className="shrink-0">
                    <Heart size={40} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
                </button>
            </div>
        </Card>
    )
}
