import { Clock, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'

export function EventMeta({
    address,
    datetime,
    iconClassName = 'size-6',
    truncate = false,
    className,
}) {
    const iconClass = cn('text-foreground shrink-0', iconClassName)
    const textClass = truncate ? 'min-w-0 truncate' : undefined

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className="flex items-start gap-2">
                <MapPin aria-hidden="true" className={iconClass} />
                <span className={textClass}>{address}</span>
            </div>
            <div className="flex items-start gap-2">
                <Clock aria-hidden="true" className={iconClass} />
                <span className={textClass}>{datetime}</span>
            </div>
        </div>
    )
}
