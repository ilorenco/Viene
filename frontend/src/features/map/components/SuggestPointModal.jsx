// Popup para solicitar a marcação de um ATOR ou EVENTO no mapa (precisa estar
// logado). RN_003: a solicitação entra como pendente e passa pela moderação.
//
// Comuns: nome*, endereço* (obrigatórios), localização no mapa, descrição,
// tags, contato e foto/logo (opcionais).
// Ator: tipo de autor*. Evento: data de início*, data de fim*, categoria*.

import { ChevronDown } from 'lucide-react'
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
import { isAuthenticated } from '@/features/auth/services/auth'
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { LocationPicker } from '@/features/map/components/LocationPicker'
import { useSuggestPoint } from '@/features/map/hooks/useSuggestPoint'
import { ATOR_TYPES } from '@/lib/atorTypes'
import { TAGS } from '@/lib/tags'
import { cn } from '@/lib/utils'

const initialForm = {
    name: '',
    address: '',
    description: '',
    type: ATOR_TYPES[0].id,
    startDate: '',
    endDate: '',
    category: mockEventCategories[0].value,
    site: '',
    email: '',
    phone: '',
}

const selectClass = 'border-secondary text-secondary rounded-2xl border-2 bg-transparent px-4 py-3'

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

export function SuggestPointModal({ open, onClose }) {
    const authed = isAuthenticated()
    const [kind, setKind] = useState('ator')
    const [form, setForm] = useState(initialForm)
    const [position, setPosition] = useState(null)
    const [tags, setTags] = useState(() => new Set())
    const [photo, setPhoto] = useState(null)
    const [showTags, setShowTags] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [error, setError] = useState('')
    const suggest = useSuggestPoint()

    function setField(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function toggleTag(id) {
        setTags((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
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
        setKind('ator')
        setForm(initialForm)
        setPosition(null)
        setTags(new Set())
        setPhoto(null)
        setShowTags(false)
        setShowContact(false)
        setError('')
        suggest.reset()
    }

    function handleClose() {
        reset()
        onClose()
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (!form.name.trim()) {
            setError('Informe o nome.')
            return
        }
        if (!form.address.trim()) {
            setError('Informe o endereço.')
            return
        }
        if (kind === 'evento') {
            if (!form.startDate || !form.endDate) {
                setError('Informe as datas de início e fim.')
                return
            }
            if (form.endDate < form.startDate) {
                setError('A data de fim deve ser igual ou posterior à de início.')
                return
            }
        }

        const common = {
            kind,
            name: form.name.trim(),
            address: form.address.trim(),
            position,
            description: form.description.trim(),
            tags: [...tags],
            contact: { site: form.site.trim(), email: form.email.trim(), phone: form.phone.trim() },
            photo: photo?.name ?? null,
        }
        const data =
            kind === 'ator'
                ? { ...common, type: form.type }
                : {
                      ...common,
                      startDate: form.startDate,
                      endDate: form.endDate,
                      category: form.category,
                  }

        suggest.mutate(data)
    }

    return (
        <Modal
            open={open}
            onOpenChange={(value) => {
                if (!value) handleClose()
            }}
        >
            <ModalContent aria-describedby={undefined}>
                <ModalTitle>Solicitar marcador</ModalTitle>

                {!authed ? (
                    <p className="text-secondary/70 text-sm">
                        <Link to="/login" className="text-primary font-semibold underline">
                            Entre na sua conta
                        </Link>{' '}
                        para solicitar um marcador no mapa.
                    </p>
                ) : suggest.isSuccess ? (
                    <div className="flex flex-col gap-3">
                        <p className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            Solicitação enviada! Ela passará pela moderação de um administrador. 👍
                        </p>
                        <Button size="sm" onClick={handleClose}>
                            Fechar
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        {/* Ator ou Evento */}
                        <div className="bg-secondary/10 flex gap-1 rounded-full p-1">
                            {[
                                { value: 'ator', label: 'Ator' },
                                { value: 'evento', label: 'Evento' },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setKind(option.value)}
                                    className={cn(
                                        'flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition',
                                        kind === option.value
                                            ? 'bg-primary text-secondary'
                                            : 'text-secondary',
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <label
                            htmlFor="sp-nome"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Nome *
                            <Input
                                id="sp-nome"
                                value={form.name}
                                onChange={(event) => setField('name', event.target.value)}
                                placeholder={
                                    kind === 'ator'
                                        ? 'Ex: Coworking Estação Criativa'
                                        : 'Ex: Meetup de Inteligência Artificial'
                                }
                                className="rounded-2xl"
                            />
                        </label>

                        <label
                            htmlFor="sp-endereco"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Endereço *
                            <Input
                                id="sp-endereco"
                                value={form.address}
                                onChange={(event) => setField('address', event.target.value)}
                                placeholder="Rua, número, bairro, cidade"
                                className="rounded-2xl"
                            />
                        </label>

                        {/* Campos específicos */}
                        {kind === 'ator' ? (
                            <div className="flex flex-col gap-1">
                                <span className="text-secondary text-sm font-semibold">
                                    Tipo de autor *
                                </span>
                                <Select
                                    value={form.type}
                                    onValueChange={(value) => setField('type', value)}
                                >
                                    <SelectTrigger
                                        aria-label="Tipo de autor"
                                        className="border-secondary text-secondary flex w-full items-center justify-between rounded-2xl border-2 bg-transparent px-4 py-3 text-left"
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="z-[2100] max-h-72">
                                        {ATOR_TYPES.map((option) => (
                                            <SelectItem key={option.id} value={option.id}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <label className="text-secondary flex flex-1 flex-col gap-1 text-sm font-semibold">
                                        Início *
                                        <input
                                            type="date"
                                            value={form.startDate}
                                            onChange={(event) =>
                                                setField('startDate', event.target.value)
                                            }
                                            className={selectClass}
                                        />
                                    </label>
                                    <label className="text-secondary flex flex-1 flex-col gap-1 text-sm font-semibold">
                                        Fim *
                                        <input
                                            type="date"
                                            value={form.endDate}
                                            onChange={(event) =>
                                                setField('endDate', event.target.value)
                                            }
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
                            </>
                        )}

                        <div className="flex flex-col gap-1">
                            <span className="text-secondary text-sm font-semibold">
                                Localização no mapa
                            </span>
                            <LocationPicker position={position} onChange={setPosition} />
                            <span className="text-secondary/50 text-xs">
                                {position
                                    ? `Marcado em ${position[0].toFixed(4)}, ${position[1].toFixed(4)} (arraste o pino para ajustar).`
                                    : 'Toque no mapa para marcar o local exato.'}
                            </span>
                        </div>

                        <label
                            htmlFor="sp-descricao"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Descrição
                            <Textarea
                                id="sp-descricao"
                                value={form.description}
                                onChange={(event) => setField('description', event.target.value)}
                                placeholder="Descreva o ponto..."
                                rows={3}
                            />
                        </label>

                        <Section
                            title={`Áreas relacionadas (opcional)${tags.size ? ` — ${tags.size}` : ''}`}
                            open={showTags}
                            onToggle={() => setShowTags((value) => !value)}
                        >
                            <div className="flex flex-wrap gap-2">
                                {TAGS.map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => toggleTag(tag.id)}
                                        aria-pressed={tags.has(tag.id)}
                                        className={cn(
                                            'rounded-full px-3 py-1 text-xs font-medium transition',
                                            tags.has(tag.id)
                                                ? 'bg-primary text-secondary'
                                                : 'bg-secondary/10 text-secondary',
                                        )}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </Section>

                        <Section
                            title="Contato (opcional)"
                            open={showContact}
                            onToggle={() => setShowContact((value) => !value)}
                        >
                            <Input
                                value={form.site}
                                onChange={(event) => setField('site', event.target.value)}
                                placeholder="Site"
                                className="rounded-2xl"
                            />
                            <Input
                                type="email"
                                value={form.email}
                                onChange={(event) => setField('email', event.target.value)}
                                placeholder="E-mail"
                                className="rounded-2xl"
                            />
                            <Input
                                value={form.phone}
                                onChange={(event) => setField('phone', event.target.value)}
                                placeholder="Telefone"
                                className="rounded-2xl"
                            />
                        </Section>

                        <div className="flex flex-col gap-2">
                            <span className="text-secondary text-sm font-semibold">
                                Foto ou logo (opcional)
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
                                disabled={suggest.isPending}
                                className="flex-1"
                            >
                                {suggest.isPending ? 'Enviando...' : 'Enviar'}
                            </Button>
                        </div>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}
