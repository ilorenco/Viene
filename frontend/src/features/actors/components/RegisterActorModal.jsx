import { Modal, ModalContent, ModalTitle } from '@/components/ui/Modal'
import { RegisterActorForm } from '@/features/actors/components/RegisterActorForm'

export function RegisterActorModal({ open, onClose }) {
    return (
        <Modal
            open={open}
            onOpenChange={(value) => {
                if (!value) onClose()
            }}
        >
            <ModalContent aria-describedby={undefined}>
                <ModalTitle>Cadastrar ator</ModalTitle>
                <RegisterActorForm onClose={onClose} />
            </ModalContent>
        </Modal>
    )
}
