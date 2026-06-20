// Popup de confirmação reutilizável (ex: confirmar exclusão).

import { Button } from '@/components/ui/Button'
import { Modal, ModalContent, ModalDescription, ModalTitle } from '@/components/ui/Modal'

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirmar',
    onConfirm,
}) {
    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <ModalContent className="max-w-sm">
                <ModalTitle>{title}</ModalTitle>
                {description && <ModalDescription>{description}</ModalDescription>}

                <div className="mt-2 flex gap-2">
                    <Button
                        size="sm"
                        onClick={() => onOpenChange(false)}
                        className="bg-secondary/10 text-secondary flex-1"
                    >
                        Cancelar
                    </Button>
                    <Button variant="danger" size="sm" onClick={onConfirm} className="flex-1">
                        {confirmLabel}
                    </Button>
                </div>
            </ModalContent>
        </Modal>
    )
}
