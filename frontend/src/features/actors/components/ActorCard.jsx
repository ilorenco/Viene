import { MapPin } from 'lucide-react'

import { Skeleton } from '@/components/ui/Skeleton'

export function ActorCard({ name, description, image, neighborhood, city }) {
    const locationLabel = [neighborhood, city].filter(Boolean).join(', ')

    return (
        <article className="border-secondary flex h-28 w-full gap-2 overflow-hidden rounded-lg border-2 p-2">
            {image ? (
                <img src={image} alt="" className="h-full w-24 shrink-0 rounded-md object-cover" />
            ) : (
                <div className="bg-primary h-full w-24 shrink-0 rounded-md" aria-hidden="true" />
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-secondary line-clamp-1 font-extrabold">{name}</h3>
                <p className="text-foreground line-clamp-2 text-xs">{description}</p>

                {locationLabel && (
                    <p className="text-secondary/60 mt-auto flex items-center gap-1 pt-1 text-xs">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate">{locationLabel}</span>
                    </p>
                )}
            </div>
        </article>
    )
}

export function ActorCardSkeleton() {
    return (
        <article
            aria-hidden="true"
            className="border-secondary/20 flex h-28 w-full gap-2 overflow-hidden rounded-lg border-2 p-2"
        >
            <Skeleton className="h-full w-24 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="mt-auto h-3 w-20" />
            </div>
        </article>
    )
}
