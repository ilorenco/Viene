// Modal "Cadastrar evento" (aberto pelo botão do catálogo de Eventos). Espelha o
// "Cadastrar ator": campos do evento — nome*, endereço*, data*, horários*, tipo*,
// localização no mapa (apenas visual; Evento ainda não tem posição no backend),
// descrição, link do ingresso e foto/banner (opcionais). RN_003: a solicitação
// entra como pendente até a moderação de um administrador (ver
// services/events.js -> createEvent / módulo de Aprovações).

import { ChevronDown, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
import { useAuth } from '@/contexts/AuthContext'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { createEvent } from '@/features/events/services/events'
import { LocationPicker } from '@/features/map/components/LocationPicker'
import { cn } from '@/lib/utils'

const selectClass = 'border-secondary text-secondary rounded-2xl border-2 bg-transparent px-4 py-3'

const initialForm = {
    name: '',
    address: '',
    date: '',
    start: '',
    end: '',
    category: mockEventCategories[0].value,
    description: '',
    ticketUrl: '',
}

// Seção recolhível (igual à do modal de ator), usada no Link do ingresso.
function Section({ title, open, onToggle, children }) {
    return (
        <div className="border-secondary/10 rounded-2xl border">
            <button
                type="button"
                onClick={onToggle}
                className="text-secondary flex w-full items-center justify-between p-3 text-sm font-semibold"
            >
                {title}
                <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
            </button>
            {open && <div className="flex flex-col gap-3 px-3 pb-3">{children}</div>}
        </div>
    )
}

export function RegisterEventModal({ open, onClose }) {
    const { isAuthenticated } = useAuth()
    const [form, setForm] = useState(initialForm)
    const [position, setPosition] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [showTicket, setShowTicket] = useState(false)
    const [error, setError] = useState('')
    const [done, setDone] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    function setField(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function handlePhoto(event) {
        const file = event.target.files?.[0]
        if (file) setPhoto({ name: file.name, url: URL.createObjectURL(file) })
    }

    // Libera a URL temporária da imagem ao trocá-la ou desmontar (evita vazamento).
    useEffect(() => {
        const url = photo?.url
        if (!url) return
        return () => URL.revokeObjectURL(url)
    }, [photo?.url])

    function reset() {
        setForm(initialForm)
        setPosition(null)
        setPhoto(null)
        setShowTicket(false)
        setError('')
        setDone(false)
        setSubmitting(false)
    }

    function handleClose() {
        reset()
        onClose()
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (!form.name.trim()) {
            setError('Informe o nome do evento.')
            return
        }
        if (!form.address.trim()) {
            setError('Informe o endereço.')
            return
        }
        if (!form.date) {
            setError('Informe a data do evento.')
            return
        }
        if (!form.start || !form.end) {
            setError('Informe os horários de início e término.')
            return
        }
        if (form.end < form.start) {
            setError('O horário de término deve ser igual ou posterior ao de início.')
            return
        }

        try {
            setSubmitting(true)
            setError('')
            await createEvent({
                title: form.name,
                address: form.address,
                date: form.date,
                start: form.start,
                end: form.end,
                category: form.category,
                description: form.description,
                ticketUrl: form.ticketUrl,
            })
            setDone(true)
        } catch (submitError) {
            setError(submitError.message ?? 'Não foi possível enviar a solicitação.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Modal
            open={open}
            onOpenChange={(value) => {
                if (!value) handleClose()
            }}
        >
            <ModalContent aria-describedby={undefined}>
                <ModalTitle>Cadastrar evento</ModalTitle>

                {!isAuthenticated ? (
                    <p className="text-secondary/70 text-sm">
                        <Link to="/login" className="text-primary font-semibold underline">
                            Entre na sua conta
                        </Link>{' '}
                        para cadastrar um evento.
                    </p>
                ) : done ? (
                    <div className="flex flex-col gap-3">
                        <p className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            Solicitação enviada! O evento passará pela moderação de um administrador
                            antes de aparecer no catálogo. 👍
                        </p>
                        <Button size="sm" onClick={handleClose}>
                            Fechar
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label
                            htmlFor="ev-nome"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Nome do evento *
                            <Input
                                id="ev-nome"
                                value={form.name}
                                onChange={(event) => setField('name', event.target.value)}
                                placeholder="Ex: Meetup de Inteligência Artificial"
                                className="rounded-2xl"
                            />
                        </label>

                        <label
                            htmlFor="ev-endereco"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Endereço *
                            <Input
                                id="ev-endereco"
                                value={form.address}
                                onChange={(event) => setField('address', event.target.value)}
                                placeholder="Rua, número, bairro, cidade"
                                className="rounded-2xl"
                            />
                        </label>

                        <label className="text-secondary flex flex-col gap-1 text-sm font-semibold">
                            Data *
                            <input
                                type="date"
                                value={form.date}
                                onChange={(event) => setField('date', event.target.value)}
                                className={selectClass}
                            />
                        </label>

                        <div className="flex gap-2">
                            <label className="text-secondary flex flex-1 flex-col gap-1 text-sm font-semibold">
                                Início *
                                <input
                                    type="time"
                                    value={form.start}
                                    onChange={(event) => setField('start', event.target.value)}
                                    className={selectClass}
                                />
                            </label>
                            <label className="text-secondary flex flex-1 flex-col gap-1 text-sm font-semibold">
                                Término *
                                <input
                                    type="time"
                                    value={form.end}
                                    onChange={(event) => setField('end', event.target.value)}
                                    className={selectClass}
                                />
                            </label>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-secondary text-sm font-semibold">
                                Tipo de evento *
                            </span>
                            <Select
                                value={form.category}
                                onValueChange={(value) => setField('category', value)}
                            >
                                <SelectTrigger
                                    aria-label="Tipo de evento"
                                    className="border-secondary text-secondary flex w-full items-center justify-between rounded-2xl border-2 bg-transparent px-4 py-3 text-left"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="z-[2100] max-h-72">
                                    {mockEventCategories.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-secondary text-sm font-semibold">
                                Localização no mapa
                            </span>
                            <LocationPicker position={position} onChange={setPosition} />
                            <span className="text-secondary/50 text-xs">
                                {position
                                    ? `Marcado em ${position[0].toFixed(4)}, ${position[1].toFixed(4)} (arraste o pino para ajustar).`
                                    : 'Toque no mapa para marcar o local do evento.'}
                            </span>
                        </div>

                        <label
                            htmlFor="ev-descricao"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Descrição (opcional)
                            <Textarea
                                id="ev-descricao"
                                value={form.description}
                                onChange={(event) => setField('description', event.target.value)}
                                placeholder="Conte do que se trata o evento, programação..."
                                rows={3}
                            />
                        </label>

                        <Section
                            title="Link do ingresso (opcional)"
                            open={showTicket}
                            onToggle={() => setShowTicket((value) => !value)}
                        >
                            <Input
                                value={form.ticketUrl}
                                onChange={(event) => setField('ticketUrl', event.target.value)}
                                placeholder="Ex: https://www.sympla.com.br/evento/..."
                                className="rounded-2xl"
                            />
                        </Section>

                        <div className="flex flex-col gap-2">
                            <span className="text-secondary text-sm font-semibold">
                                Foto ou banner (opcional)
                            </span>
                            <div className="flex items-center gap-3">
                                {photo && (
                                    <img
                                        src={photo.url}
                                        alt=""
                                        className="size-14 rounded-xl object-cover"
                                    />
                                )}
                                <label className="bg-secondary/10 text-secondary cursor-pointer rounded-full px-3 py-2 text-sm font-semibold">
                                    {photo ? 'Trocar imagem' : 'Escolher imagem'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhoto}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {error && <p className="text-danger text-sm">{error}</p>}

                        <div className="mt-1 flex gap-2">
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleClose}
                                className="bg-secondary/10 text-secondary flex-1"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={submitting}
                                className="flex flex-1 items-center justify-center gap-2"
                            >
                                {submitting && <Loader2 className="size-4 animate-spin" />}
                                {submitting ? 'Enviando...' : 'Solicitar cadastro'}
                            </Button>
                        </div>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}
