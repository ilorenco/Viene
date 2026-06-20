import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const sheetVariants = cva(
    'bg-background fixed z-50 flex flex-col gap-4 p-6 pt-14 shadow-xl data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right',
    {
        variants: {
            side: {
                right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm rounded-l-2xl',
                left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm rounded-r-2xl',
            },
        },
        defaultVariants: {
            side: 'right',
        },
    },
)

export function Sheet(props) {
    return <DialogPrimitive.Root {...props} />
}

export function SheetTrigger(props) {
    return <DialogPrimitive.Trigger {...props} />
}

export function SheetClose(props) {
    return <DialogPrimitive.Close {...props} />
}

export function SheetTitle(props) {
    return <DialogPrimitive.Title {...props} />
}

export function SheetDescription(props) {
    return <DialogPrimitive.Description {...props} />
}

export function SheetContent({
    side = 'right',
    closeIcon: CloseIcon = X,
    className,
    children,
    ...props
}) {
    return (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50 bg-black/40" />
            <DialogPrimitive.Content className={cn(sheetVariants({ side }), className)} {...props}>
                {children}
                <DialogPrimitive.Close
                    aria-label="Fechar"
                    className="absolute top-4 right-4 cursor-pointer"
                >
                    <CloseIcon className="size-7" />
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    )
}
