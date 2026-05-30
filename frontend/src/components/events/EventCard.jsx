import { LikeButton } from '@/components/ui/LikeButton'

export function EventCard({ title }) {
    return (
        <article className="flex w-72 shrink-0 flex-col gap-2">
            <div className="bg-primary h-32 rounded-md" />

            <div className="flex items-center justify-between pl-2">
                <h3 className="font-montserrat text-secondary line-clamp-2 w-2/3 text-sm font-extrabold">
                    {title}
                </h3>
                <LikeButton />
            </div>
        </article>
    )
}
