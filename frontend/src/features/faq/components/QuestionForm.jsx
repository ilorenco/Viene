// Seção "Não encontrou sua resposta?": envia uma pergunta ao admin. É uma MUTAÇÃO
// (não uma busca), então mantém o próprio estado local de envio (sending/sent/erro)
// — o <Suspense> cuida só de leituras. Sem login, mostra o convite para entrar.
//
// Visual: banda CINZA-ESCURO que vai de FORA A FORA (FullBleed = largura total da
// janela, igual à seção "Explore" da Home), bem espaçada da lista de perguntas
// acima. O conteúdo segue o alinhamento da página (lg:px-[10%]). O botão "Enviar"
// fica no canto direito e "Limpar pergunta" ao lado, mas afastado, para evitar
// clique acidental.

import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { FullBleed } from '@/components/layout/FullBleed'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { isAuthenticated } from '@/services/auth'
import { QUESTIONS_KEY, submitQuestion } from '@/services/questions'

export function QuestionForm() {
    const authed = isAuthenticated()
    const queryClient = useQueryClient()
    const [question, setQuestion] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')

    async function handleSend(event) {
        event.preventDefault()
        if (!question.trim()) return
        setSending(true)
        setError('')
        try {
            await submitQuestion({ question: question.trim() })
            // Mutação: invalida o cache de perguntas para o Perfil e o Admin rebuscarem.
            await queryClient.invalidateQueries({ queryKey: QUESTIONS_KEY })
            setSent(true)
            setQuestion('')
        } catch (err) {
            setError(err?.message ?? 'Não foi possível enviar sua pergunta. Tente novamente.')
        } finally {
            setSending(false)
        }
    }

    return (
        <FullBleed className="bg-secondary mt-4 lg:mt-8">
            <section className="flex flex-col gap-4 px-4 py-6 lg:px-[10%] lg:py-8">
                <div>
                    <h2 className="text-background font-montserrat text-xl font-extrabold lg:text-2xl">
                        Não encontrou sua resposta?
                    </h2>
                    <p className="text-background/60 text-sm">
                        Envie sua pergunta para os administradores. Você recebe a resposta no seu
                        perfil.
                    </p>
                </div>

                {!authed ? (
                    <p className="text-background/80 text-sm">
                        <Link to="/login" className="text-primary font-semibold underline">
                            Entre na sua conta
                        </Link>{' '}
                        para enviar uma pergunta ao administrador.
                    </p>
                ) : sent ? (
                    <div className="flex flex-col items-start gap-2">
                        <p className="animate-fade-in rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            Pergunta enviada! Acompanhe a resposta no seu perfil. 👍
                        </p>
                        <button
                            type="button"
                            onClick={() => setSent(false)}
                            className="text-primary text-sm font-semibold"
                        >
                            Enviar outra pergunta
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="flex flex-col gap-4">
                        <Textarea
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            placeholder="Escreva a sua dúvida..."
                            className="border-transparent bg-white"
                        />
                        {error && (
                            <p className="text-danger animate-fade-in text-sm font-semibold">
                                {error}
                            </p>
                        )}

                        {/* Ações alinhadas à direita; "Limpar" antes de "Enviar" com um
                            espaço maior (gap-8) entre os dois para evitar clique errado.
                            No mobile empilham (flex-col-reverse mantém "Enviar" em cima). */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-8">
                            <button
                                type="button"
                                onClick={() => setQuestion('')}
                                disabled={!question.trim()}
                                className="text-background/70 hover:text-background text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Limpar pergunta
                            </button>
                            <Button type="submit" size="sm" disabled={sending}>
                                {sending ? 'Enviando...' : 'Enviar pergunta'}
                            </Button>
                        </div>
                    </form>
                )}
            </section>
        </FullBleed>
    )
}
