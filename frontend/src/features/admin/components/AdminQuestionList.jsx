// Solicitações dos usuários: o admin responde/edita respostas e pode removê-las.
// A separação pendentes/respondidas fica no hook useFilteredQuestions; aqui a tela
// só desenha e trata as mutações (que invalidam a query).

import { useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/Badge'
import { ConfirmDialog } from '@/features/admin/components/ConfirmDialog'
import { QuestionAnswerModal } from '@/features/admin/components/QuestionAnswerModal'
import { ADMIN_KEYS } from '@/features/admin/hooks/useAdminData'
import { useFilteredQuestions } from '@/features/admin/hooks/useFilteredQuestions'
import { createFaq } from '@/features/faq/services/faq'
import { useFeedback } from '@/hooks/useFeedback'
import { answerQuestion, deleteQuestion } from '@/services/questions'

function QuestionRow({ question, onAnswer, onDelete }) {
    const isPending = question.status === 'pendente'
    return (
        <li className="border-secondary/10 flex flex-col gap-2 rounded-2xl border bg-white p-3">
            <div className="flex items-start justify-between gap-2">
                <p className="text-secondary font-semibold">{question.question}</p>
                <Badge variant={isPending ? 'danger' : 'success'}>
                    {isPending ? 'Pendente' : 'Respondida'}
                </Badge>
            </div>
            <p className="text-secondary/50 text-xs">
                Enviada por {question.userName} • {question.createdAt}
            </p>
            {question.answer && (
                <p className="text-secondary/70 border-secondary/10 mt-1 border-t pt-2 text-sm">
                    <span className="font-semibold">Resposta: </span>
                    {question.answer}
                </p>
            )}
            <div className="mt-1 flex items-center gap-2">
                <button
                    type="button"
                    onClick={onAnswer}
                    className="border-secondary/20 text-secondary flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-semibold transition active:scale-95"
                >
                    <Pencil className="size-4" />
                    {isPending ? 'Responder' : 'Editar resposta'}
                </button>
                <button
                    type="button"
                    aria-label="Excluir"
                    onClick={onDelete}
                    className="text-danger rounded-full p-2 transition active:scale-90"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
        </li>
    )
}

function Group({ title, count, emptyText, children }) {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <h3 className="text-secondary font-montserrat text-lg font-extrabold">{title}</h3>
                <span className="bg-secondary/10 text-secondary rounded-full px-2 py-0.5 text-xs font-bold">
                    {count}
                </span>
            </div>
            {count === 0 ? (
                <p className="text-secondary/50 text-sm">{emptyText}</p>
            ) : (
                <ul className="flex flex-col gap-2">{children}</ul>
            )}
        </section>
    )
}

export function AdminQuestionList() {
    const queryClient = useQueryClient()
    const [answering, setAnswering] = useState(null)
    const [toDelete, setToDelete] = useState(null)
    const [feedback, setFeedback] = useFeedback()

    // Separação pendentes/respondidas no hook (suspende junto via useAdminQuestions).
    const { pending, answered } = useFilteredQuestions()

    async function handleSave({ answer, publish }) {
        await answerQuestion(answering.id, { answer })
        if (publish) {
            // Pergunta de usuário não tem página específica — entra como "Geral".
            await createFaq({ category: 'geral', question: answering.question, answer })
            await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.faqs })
        }
        setAnswering(null)
        setFeedback('Resposta enviada ao usuário.')
        await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.questions })
    }

    async function handleDelete() {
        await deleteQuestion(toDelete.id)
        setToDelete(null)
        setFeedback('Pergunta removida.')
        await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.questions })
    }

    return (
        <div className="flex flex-col gap-4">
            {feedback && (
                <p className="animate-fade-in rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    {feedback}
                </p>
            )}

            <Group title="Pendentes" count={pending.length} emptyText="Nenhuma pergunta pendente.">
                {pending.map((item) => (
                    <QuestionRow
                        key={item.id}
                        question={item}
                        onAnswer={() => setAnswering(item)}
                        onDelete={() => setToDelete(item)}
                    />
                ))}
            </Group>

            <Group title="Respondidas" count={answered.length} emptyText="Nenhuma resposta ainda.">
                {answered.map((item) => (
                    <QuestionRow
                        key={item.id}
                        question={item}
                        onAnswer={() => setAnswering(item)}
                        onDelete={() => setToDelete(item)}
                    />
                ))}
            </Group>

            <QuestionAnswerModal
                question={answering}
                onClose={() => setAnswering(null)}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={Boolean(toDelete)}
                onOpenChange={(value) => {
                    if (!value) setToDelete(null)
                }}
                title="Excluir pergunta"
                description={toDelete ? `Remover a pergunta de ${toDelete.userName}?` : ''}
                confirmLabel="Excluir"
                onConfirm={handleDelete}
            />
        </div>
    )
}
