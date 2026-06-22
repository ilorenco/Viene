// Popup de formulário para adicionar/editar uma pergunta frequente (admin).

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal, ModalContent, ModalTitle } from '@/components/ui/Modal'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { FAQ_PAGE_OPTIONS } from '@/features/faq/mocks/faqs'

// Opções de categoria pro select (sem "todas", que é só filtro da página pública).
const CATEGORY_OPTIONS = FAQ_PAGE_OPTIONS.filter((option) => option.value !== 'todas')

export function FaqFormModal({ open, faq, onClose, onSave }) {
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    // Preenche os campos ao editar, ou limpa ao criar uma nova pergunta. Padrão do
    // React de "ajustar estado durante o render", em vez de um useEffect + setState.
    const resetKey = `${open}|${faq?.id}`
    const [prevResetKey, setPrevResetKey] = useState(resetKey)
    if (resetKey !== prevResetKey) {
        setPrevResetKey(resetKey)
        setCategory(faq?.category ?? CATEGORY_OPTIONS[0].value)
        setQuestion(faq?.question ?? '')
        setAnswer(faq?.answer ?? '')
        setError('')
    }

    async function handleSave() {
        if (!question.trim() || !answer.trim()) {
            setError('Preencha a pergunta e a resposta.')
            return
        }
        setSubmitting(true)
        await onSave({ category, question: question.trim(), answer: answer.trim() })
        setSubmitting(false)
    }

    return (
        <Modal
            open={open}
            onOpenChange={(value) => {
                if (!value) onClose()
            }}
        >
            <ModalContent aria-describedby={undefined}>
                <ModalTitle>{faq ? 'Editar pergunta' : 'Nova pergunta'}</ModalTitle>

                <div className="flex flex-col gap-1">
                    <span className="text-secondary text-sm font-semibold">Página</span>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger
                            aria-label="Página"
                            className="border-secondary text-secondary flex w-full items-center justify-between rounded-2xl border-2 bg-transparent px-4 py-3 text-left"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[2100] max-h-72">
                            {CATEGORY_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <label
                    htmlFor="faq-question"
                    className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                >
                    Pergunta
                    <Input
                        id="faq-question"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        placeholder="Ex: Como me inscrevo em um evento?"
                        className="rounded-2xl"
                    />
                </label>

                <label
                    htmlFor="faq-answer"
                    className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                >
                    Resposta
                    <Textarea
                        id="faq-answer"
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                        placeholder="Escreva a resposta..."
                        rows={5}
                    />
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
                    <Button size="sm" disabled={submitting} onClick={handleSave} className="flex-1">
                        Salvar
                    </Button>
                </div>
            </ModalContent>
        </Modal>
    )
}
