import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/lib/utils'

export function Modal(props) {
    return <DialogPrimitive.Root {...props} />
}

export function ModalTitle({ className, ...props }) {
    return (
        <DialogPrimitive.Title
            className={cn('text-secondary text-xl font-extrabold', className)}
            {...props}
        />
    )
}

export function ModalContent({ className, children, ...props }) {
    return (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50 bg-black/40" />
            <DialogPrimitive.Content
                className={cn(
                    'bg-background data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-3xl p-6 shadow-xl',
                    className,
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    )
}
