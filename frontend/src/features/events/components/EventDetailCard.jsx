import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { LikeButton } from '@/components/ui/LikeButton'
import { Skeleton } from '@/components/ui/Skeleton'

import { EventMeta } from './EventMeta'

export function EventDetailCard({ id, title, address, datetime, onGenerateTicket }) {
    return (
        <article className="border-secondary relative flex w-full flex-col gap-3 rounded-lg border-2 p-3">
            <Link to={`/events/${id}`} aria-label={title} className="absolute inset-0 z-10" />

            <div className="bg-primary relative h-48 rounded-md">
                <h3 className="font-montserrat text-secondary absolute bottom-3 left-3 text-xl font-extrabold">
                    {title}
                </h3>

                {onGenerateTicket && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="xs"
                        onClick={onGenerateTicket}
                        className="absolute top-3 right-3 z-20 font-medium"
                    >
                        Gerar Ticket
                    </Button>
                )}
            </div>

            <div className="text-secondary flex items-end justify-between gap-3">
                <EventMeta
                    address={address}
                    datetime={datetime}
                    truncate
                    className="min-w-0 flex-1 text-sm"
                />

                <LikeButton className="relative z-20" />
            </div>
        </article>
    )
}

export function EventDetailCardSkeleton() {
    return (
        <article
            aria-hidden="true"
            className="border-secondary/20 flex w-full flex-col gap-3 rounded-lg border-2 p-3"
        >
            <Skeleton className="h-48 w-full" />

            <div className="flex items-end justify-between gap-3">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-6 shrink-0" />
                        <Skeleton className="h-4 flex-1" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="size-6 shrink-0" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
                <Skeleton className="size-10 shrink-0 rounded-full" />
            </div>
        </article>
    )
}
