// Popup para o admin responder (ou editar a resposta de) uma pergunta do usuário.

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Modal, ModalContent, ModalDescription, ModalTitle } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'

export function QuestionAnswerModal({ question, onClose, onSave }) {
    const [answer, setAnswer] = useState('')
    const [publish, setPublish] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    // Padrão do React de "ajustar estado durante o render", em vez de um
    // useEffect + setState: preenche/limpa os campos ao abrir uma pergunta nova.
    const [prevQuestionId, setPrevQuestionId] = useState(question?.id)
    if (question?.id !== prevQuestionId) {
        setPrevQuestionId(question?.id)
        setAnswer(question?.answer ?? '')
        setPublish(false)
        setError('')
    }

    async function handleSave() {
        if (!answer.trim()) {
            setError('Escreva uma resposta.')
            return
        }
        setSubmitting(true)
        await onSave({ answer: answer.trim(), publish })
        setSubmitting(false)
    }

    return (
        <Modal
            open={Boolean(question)}
            onOpenChange={(value) => {
                if (!value) onClose()
            }}
        >
            <ModalContent>
                <ModalTitle>Responder pergunta</ModalTitle>
                {question && (
                    <>
                        <ModalDescription>"{question.question}"</ModalDescription>
                        <p className="text-secondary/50 text-xs">
                            Enviada por {question.userName} • {question.createdAt}
                        </p>

                        <label
                            htmlFor="question-answer"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Resposta
                            <Textarea
                                id="question-answer"
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                                placeholder="Escreva a resposta para o usuário..."
                                rows={5}
                            />
                        </label>

                        <label className="text-secondary flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={publish}
                                onChange={(event) => setPublish(event.target.checked)}
                                className="accent-primary size-4"
                            />
                            Publicar também nas Perguntas Frequentes
                        </label>

                        {error && <p className="text-danger text-sm">{error}</p>}

                        <div className="mt-2 flex gap-2">
                            <Button
                                size="sm"
                                onClick={onClose}
                                className="bg-secondary/10 text-secondary flex-1"
                            >
                                Cancelar
                            </Button>
                            <Button
                                size="sm"
                                disabled={submitting}
                                onClick={handleSave}
                                className="flex-1"
                            >
                                Enviar resposta
                            </Button>
                        </div>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
