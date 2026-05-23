import { useDraggableCarousel } from '@/hooks/useDraggableCarousel'
import { cn } from '@/lib/utils'

export function DraggableTrack({ className, children }) {
    const [emblaRef] = useDraggableCarousel()

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className={cn('flex', className)}>{children}</div>
        </div>
    )
}
