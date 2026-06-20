// Popup (modal) central reutilizável, baseado no @radix-ui/react-dialog.
// Aparece centralizado, com fundo escurecido e animação de zoom/fade.
//
// Uso (controlado):
//   <Modal open={aberto} onOpenChange={setAberto}>
//       <ModalContent>
//           <ModalTitle>Título</ModalTitle>
//           <ModalDescription>Texto</ModalDescription>
//           ...
//       </ModalContent>
//   </Modal>

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Modal(props) {
    return <DialogPrimitive.Root {...props} />
}

export function ModalTrigger(props) {
    return <DialogPrimitive.Trigger {...props} />
}

export function ModalClose(props) {
    return <DialogPrimitive.Close {...props} />
}

export function ModalTitle({ className, ...props }) {
    return (
        <DialogPrimitive.Title
            className={cn('text-secondary text-xl font-extrabold', className)}
            {...props}
        />
    )
}

export function ModalDescription({ className, ...props }) {
    return (
        <DialogPrimitive.Description
            className={cn('text-secondary/70 text-sm', className)}
            {...props}
        />
    )
}

export function ModalContent({ className, children, ...props }) {
    return (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-[2000] bg-black/40" />
            <DialogPrimitive.Content
                className={cn(
                    'bg-background data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out fixed top-1/2 left-1/2 z-[2000] flex max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-3xl p-6 shadow-xl',
                    className,
                )}
                {...props}
            >
                {children}
                <DialogPrimitive.Close
                    aria-label="Fechar"
                    className="text-secondary absolute top-4 right-4 cursor-pointer transition active:scale-90"
                >
                    <X className="size-5" />
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    )
}
