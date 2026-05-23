import { Clock, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'

export function EventMeta({ address, datetime, iconSize = 25, className }) {
    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className="flex items-start gap-2">
                <MapPin size={iconSize} aria-hidden="true" className="text-foreground shrink-0" />
                <span>{address}</span>
            </div>
            <div className="flex items-start gap-2">
                <Clock size={iconSize} aria-hidden="true" className="text-foreground shrink-0" />
                <span>{datetime}</span>
            </div>
        </div>
    )
}
