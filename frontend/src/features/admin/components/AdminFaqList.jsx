// Seção "Ajuda" do admin: gerenciar (adicionar/editar/excluir) as perguntas frequentes.

import { useQueryClient } from '@tanstack/react-query'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { ConfirmDialog } from '@/features/admin/components/ConfirmDialog'
import { FaqFormModal } from '@/features/admin/components/FaqFormModal'
import { ADMIN_KEYS, useAdminFaqs } from '@/features/admin/hooks/useAdminData'
import { createFaq, deleteFaq, updateFaq } from '@/features/faq/services/faq'
import { useFeedback } from '@/hooks/useFeedback'

export function AdminFaqList() {
    const { data: faqs } = useAdminFaqs()
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState(null)
    const [creating, setCreating] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [feedback, setFeedback] = useFeedback()

    async function handleSave(values) {
        if (editing) {
            await updateFaq(editing.id, values)
            setFeedback('Pergunta atualizada.')
        } else {
            await createFaq(values)
            setFeedback('Pergunta adicionada.')
        }
        setEditing(null)
        setCreating(false)
        await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.faqs })
    }

    async function handleDelete() {
        await deleteFaq(toDelete.id)
        setToDelete(null)
        setFeedback('Pergunta removida.')
        await queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.faqs })
    }

    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-secondary font-montserrat text-xl font-extrabold">
                    Perguntas Frequentes
                </h2>
                <button
                    type="button"
                    onClick={() => setCreating(true)}
                    className="bg-primary text-secondary flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold transition active:scale-95"
                >
                    <Plus className="size-4" />
                    Nova
                </button>
            </div>

            {feedback && (
                <p className="animate-fade-in rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    {feedback}
                </p>
            )}

            {faqs.length === 0 ? (
                <p className="text-secondary/60 py-8 text-center text-sm">
                    Nenhuma pergunta cadastrada.
                </p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {faqs.map((faq) => (
                        <li
                            key={faq.id}
                            className="border-secondary/10 flex items-start gap-3 rounded-2xl border bg-white p-3"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="text-secondary font-semibold">{faq.question}</p>
                                <p className="text-secondary/60 mt-0.5 line-clamp-2 text-xs">
                                    {faq.answer}
                                </p>
                            </div>
                            <button
                                type="button"
                                aria-label="Editar"
                                onClick={() => setEditing(faq)}
                                className="text-secondary rounded-full p-2 transition active:scale-90"
                            >
                                <Pencil className="size-4" />
                            </button>
                            <button
                                type="button"
                                aria-label="Excluir"
                                onClick={() => setToDelete(faq)}
                                className="text-danger rounded-full p-2 transition active:scale-90"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <FaqFormModal
                open={creating || Boolean(editing)}
                faq={editing}
                onClose={() => {
                    setCreating(false)
                    setEditing(null)
                }}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={Boolean(toDelete)}
                onOpenChange={(value) => {
                    if (!value) setToDelete(null)
                }}
                title="Excluir pergunta"
                description={toDelete ? `Remover "${toDelete.question}"?` : ''}
                confirmLabel="Excluir"
                onConfirm={handleDelete}
            />
        </section>
    )
}
