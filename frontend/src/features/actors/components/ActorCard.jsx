import { Skeleton } from '@/components/ui/Skeleton'

export function ActorCard({ name, description, image }) {
    return (
        <article className="border-secondary flex w-full gap-2 rounded-lg border-2 p-2">
            {image ? (
                <img src={image} alt="" className="h-20 w-24 shrink-0 rounded-md object-cover" />
            ) : (
                <div className="bg-primary h-20 w-24 shrink-0 rounded-md" aria-hidden="true" />
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-secondary font-extrabold">{name}</h3>
                <p className="text-foreground line-clamp-3 text-xs">{description}</p>
            </div>
        </article>
    )
}

export function ActorCardSkeleton() {
    return (
        <article
            aria-hidden="true"
            className="border-secondary/20 flex w-full gap-2 rounded-lg border-2 p-2"
        >
            <Skeleton className="h-20 w-24 shrink-0" />

            <div className="flex min-w-0 flex-1 flex-col gap-2 py-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
            </div>
        </article>
    )
}
