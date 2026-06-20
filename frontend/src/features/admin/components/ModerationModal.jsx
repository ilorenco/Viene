// Popup de moderação: revisar um item e aprovar/rejeitar com um comentário.
// RN_003 (aprovação obrigatória) + POST /admin/comentarios (comentário de moderação).

import { useState } from 'react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal, ModalContent, ModalDescription, ModalTitle } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import { TYPE_LABELS, TYPE_VARIANTS } from '@/lib/adminLabels'

export function ModerationModal({ item, onClose, onDecide }) {
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)

    // Limpa o comentário sempre que um novo item é aberto. Padrão do React de
    // "ajustar estado durante o render", em vez de um useEffect + setState.
    const [prevItemId, setPrevItemId] = useState(item?.id)
    if (item?.id !== prevItemId) {
        setPrevItemId(item?.id)
        setComment('')
    }

    async function decide(approved) {
        setSubmitting(true)
        await onDecide(item, approved, comment.trim())
        setSubmitting(false)
    }

    return (
        <Modal
            open={Boolean(item)}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <ModalContent>
                {item && (
                    <>
                        <Badge variant={TYPE_VARIANTS[item.type]} className="self-start">
                            {TYPE_LABELS[item.type]}
                        </Badge>
                        <ModalTitle>{item.title}</ModalTitle>
                        <ModalDescription>{item.summary}</ModalDescription>
                        <p className="text-secondary/50 text-xs">
                            Enviado por {item.submittedBy} • {item.submittedAt}
                        </p>

                        <label
                            htmlFor="moderation-comment"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Comentário de moderação (opcional)
                            <Textarea
                                id="moderation-comment"
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                placeholder="Ex: motivo da rejeição ou observações para o autor..."
                            />
                        </label>

                        <div className="mt-2 flex gap-2">
                            <Button
                                variant="danger"
                                size="sm"
                                disabled={submitting}
                                onClick={() => decide(false)}
                                className="flex-1"
                            >
                                Rejeitar
                            </Button>
                            <Button
                                size="sm"
                                disabled={submitting}
                                onClick={() => decide(true)}
                                className="flex-1"
                            >
                                Aprovar
                            </Button>
                        </div>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
