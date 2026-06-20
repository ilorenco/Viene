import { Clock, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'

export function EventMeta({ address, datetime, iconClassName = 'size-5 sm:size-6', className }) {
    const iconClass = cn('text-foreground shrink-0', iconClassName)

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            {address && (
                <div className="flex items-start gap-2">
                    <MapPin aria-hidden="true" className={iconClass} />
                    <span>{address}</span>
                </div>
            )}
            {datetime && (
                <div className="flex items-start gap-2">
                    <Clock aria-hidden="true" className={iconClass} />
                    <span>{datetime}</span>
                </div>
            )}
        </div>
    )
}
