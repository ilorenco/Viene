// Ações do perfil de ator (canto superior direito do bloco de conteúdo):
//   - Favoritar: coração que liga/desliga e mostra um AVISO no canto inferior
//     direito da tela (toast com auto-dispensa, via useFeedback).
//   - Três pontos: abre um menu com "Compartilhar" e "Denunciar". Denunciar abre um
//     diálogo pedindo a JUSTIFICATIVA, que é registrada e aparece na administração
//     (Plataforma > Denúncias).
//
// Esboço (mock): favoritar é estado em memória; compartilhar copia o link; a
// denúncia é salva numa lista em memória (services/reports). Trocar por chamadas
// reais quando houver back-end.

import { useQueryClient } from '@tanstack/react-query'
import { Flag, Heart, MoreVertical, Share2, X } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/Button'
import { Modal, ModalContent, ModalDescription, ModalTitle } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import { ADMIN_KEYS } from '@/features/admin/hooks/useAdminData'
import { submitReport } from '@/features/admin/services/reports'
import { useFeedback } from '@/hooks/useFeedback'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { cn } from '@/lib/utils'

const BUTTON_CLASS =
    'border-secondary/15 text-secondary hover:border-primary hover:text-primary flex size-10 shrink-0 items-center justify-center rounded-full border bg-white transition active:scale-90'

// Reutilizável para atores e eventos: `name` é o nome exibido (toast/denúncia) e
// `entityType` ('ator' | 'evento') marca o tipo na denúncia.
export function ActorActions({ name, entityType = 'ator' }) {
    const queryClient = useQueryClient()
    // Favoritar e denunciar exigem login: sem conta, requireAuth leva ao /login.
    const { requireAuth } = useRequireAuth()
    const [liked, setLiked] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [feedback, setFeedback] = useFeedback()

    // Diálogo de denúncia (pede a justificativa antes de enviar).
    const [reportOpen, setReportOpen] = useState(false)
    const [reportReason, setReportReason] = useState('')
    const [sending, setSending] = useState(false)

    function toggleLike() {
        setLiked((prev) => {
            const next = !prev
            setFeedback(
                next
                    ? `"${name}" foi adicionado aos favoritos.`
                    : `"${name}" foi removido dos favoritos.`,
            )
            return next
        })
    }

    function share() {
        setMenuOpen(false)
        try {
            navigator.clipboard?.writeText(window.location.href)
        } catch {
            // Ignora se o navegador bloquear o clipboard.
        }
        setFeedback('Link copiado para compartilhar.')
    }

    function openReport() {
        setMenuOpen(false)
        setReportReason('')
        setReportOpen(true)
    }

    async function sendReport() {
        const reason = reportReason.trim()
        if (!reason || sending) return
        setSending(true)
        try {
            await submitReport({ name, type: entityType, reason })
            // Faz a administração (Plataforma > Denúncias) rebuscar a lista.
            queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.reports })
            setReportOpen(false)
            setReportReason('')
            setFeedback('Denúncia enviada. Nossa equipe vai analisar. Obrigado!')
        } finally {
            setSending(false)
        }
    }

    return (
        <>
            <div className="flex shrink-0 items-center gap-2">
                {/* Favoritar */}
                <button
                    type="button"
                    onClick={() => requireAuth(toggleLike)}
                    aria-pressed={liked}
                    aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    className={BUTTON_CLASS}
                >
                    <Heart
                        strokeWidth={1.5}
                        className={cn('size-5', liked && 'text-primary fill-current')}
                    />
                </button>

                {/* Três pontos: menu de compartilhar / denunciar */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-label="Mais opções"
                        className={BUTTON_CLASS}
                    >
                        <MoreVertical className="size-5" />
                    </button>

                    {menuOpen && (
                        <>
                            {/* Clicar fora fecha o menu. */}
                            <button
                                type="button"
                                aria-hidden="true"
                                tabIndex={-1}
                                onClick={() => setMenuOpen(false)}
                                className="fixed inset-0 z-[60] cursor-default"
                            />
                            <div className="bg-background border-secondary/10 absolute top-full right-0 z-[61] mt-2 flex w-48 flex-col overflow-hidden rounded-xl border shadow-xl">
                                <button
                                    type="button"
                                    onClick={share}
                                    className="text-secondary hover:bg-secondary/5 flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition"
                                >
                                    <Share2 className="text-primary size-4 shrink-0" />
                                    Compartilhar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => requireAuth(openReport)}
                                    className="text-danger hover:bg-danger/5 flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition"
                                >
                                    <Flag className="size-4 shrink-0" />
                                    Denunciar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Diálogo de denúncia: pede a justificativa. */}
            <Modal
                open={reportOpen}
                onOpenChange={(value) => {
                    if (!sending) setReportOpen(value)
                }}
            >
                <ModalContent>
                    <ModalTitle>Denunciar {entityType === 'evento' ? 'evento' : 'ator'}</ModalTitle>
                    <ModalDescription>
                        Conte o motivo da denúncia de “{name}”. Sua justificativa será enviada aos
                        administradores.
                    </ModalDescription>
                    <Textarea
                        value={reportReason}
                        onChange={(event) => setReportReason(event.target.value)}
                        placeholder="Descreva o motivo da denúncia..."
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setReportOpen(false)}
                            disabled={sending}
                            className="text-secondary/70 hover:text-secondary rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <Button
                            type="button"
                            size="sm"
                            variant="danger"
                            onClick={sendReport}
                            disabled={sending || !reportReason.trim()}
                        >
                            {sending ? 'Enviando...' : 'Enviar denúncia'}
                        </Button>
                    </div>
                </ModalContent>
            </Modal>

            {/* Aviso (toast) no canto inferior direito da tela. */}
            {feedback &&
                createPortal(
                    <div
                        role="status"
                        className="bg-secondary text-background animate-fade-in fixed right-4 bottom-4 z-[1600] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold shadow-xl sm:max-w-sm"
                    >
                        <span>{feedback}</span>
                        <button
                            type="button"
                            aria-label="Fechar aviso"
                            onClick={() => setFeedback('')}
                            className="text-background/70 hover:text-background shrink-0 transition active:scale-90"
                        >
                            <X className="size-4" />
                        </button>
                    </div>,
                    document.body,
                )}
        </>
    )
}
