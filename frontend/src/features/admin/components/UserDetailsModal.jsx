// Popup com os detalhes de um usuário + ação de excluir.

import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal, ModalContent, ModalTitle } from '@/components/ui/Modal'
import { ROLE_LABELS, ROLE_VARIANTS, STATUS_LABELS, STATUS_VARIANTS } from '@/lib/adminLabels'

export function UserDetailsModal({ user, onClose, onDelete }) {
    return (
        <Modal
            open={Boolean(user)}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <ModalContent aria-describedby={undefined}>
                {user && (
                    <>
                        <div className="flex items-center gap-3">
                            <Avatar size="md" name={user.name} />
                            <div className="min-w-0">
                                <ModalTitle className="truncate">{user.name}</ModalTitle>
                                <p className="text-secondary/60 truncate text-sm">{user.email}</p>
                            </div>
                        </div>

                        <dl className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-secondary/60 text-sm">Perfil</dt>
                                <dd>
                                    <Badge variant={ROLE_VARIANTS[user.role]}>
                                        {ROLE_LABELS[user.role]}
                                    </Badge>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-secondary/60 text-sm">Situação</dt>
                                <dd>
                                    <Badge variant={STATUS_VARIANTS[user.status]}>
                                        {STATUS_LABELS[user.status]}
                                    </Badge>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-secondary/60 text-sm">Cadastrado em</dt>
                                <dd className="text-secondary text-sm font-medium">
                                    {user.createdAt}
                                </dd>
                            </div>
                        </dl>

                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(user)}
                            className="mt-2"
                        >
                            Excluir usuário
                        </Button>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
