import { Link } from 'react-router-dom'

import { LikeButton } from '@/components/ui/LikeButton'
import { Skeleton } from '@/components/ui/Skeleton'

export function EventCard({ id, title }) {
    return (
        <article className="relative flex w-72 shrink-0 flex-col gap-2">
            <Link to={`/events/${id}`} aria-label={title} className="absolute inset-0 z-10" />

            <div className="bg-primary h-32 rounded-md" />

            <div className="flex items-center justify-between pl-2">
                <h3 className="font-montserrat text-secondary line-clamp-2 w-2/3 text-sm font-extrabold">
                    {title}
                </h3>
                <LikeButton className="relative z-20" />
            </div>
        </article>
    )
}

export function EventCardSkeleton() {
    return (
        <article aria-hidden="true" className="flex w-72 shrink-0 flex-col gap-2">
            <Skeleton className="h-32 w-full" />

            <div className="flex items-center justify-between pl-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="size-10 shrink-0 rounded-full" />
            </div>
        </article>
    )
}
