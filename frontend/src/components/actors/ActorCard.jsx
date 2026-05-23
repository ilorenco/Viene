import { Card } from '@/components/ui/Card'

export function ActorCard({ name, description, image }) {
    return (
        <Card
            as="article"
            className="border-secondary w-full flex-row gap-2 rounded-lg border-2 p-2"
        >
            {image ? (
                <img src={image} alt="" className="h-20 w-24 shrink-0 rounded-md object-cover" />
            ) : (
                <div className="bg-primary h-20 w-24 shrink-0 rounded-md" aria-hidden="true" />
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-secondary font-extrabold">{name}</h3>
                <p className="text-foreground line-clamp-3 text-xs">{description}</p>
            </div>
        </Card>
    )
}
