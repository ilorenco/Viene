// Modal "Cadastrar ator" (aberto pelo botão do catálogo). Tem os mesmos campos do
// "Solicitar marcador" do mapa (versão Ator): nome*, endereço*, tipo de ator*,
// localização no mapa, descrição, contato e foto/logo (opcionais). RN_003: a
// solicitação entra como pendente até a moderação de um administrador (ver
// services/actors.js -> createActor / módulo de Aprovações).

import { ChevronDown, Loader2 } from 'lucide-react'
import { useState } from 'react'
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
import { createActor } from '@/features/actors/services/actors'
import { LocationPicker } from '@/features/map/components/LocationPicker'
import { ATOR_TYPES } from '@/lib/atorTypes'
import { cn } from '@/lib/utils'
import { uploadImage } from '@/services/uploads'

const initialForm = {
    name: '',
    address: '',
    type: ATOR_TYPES[0].id,
    description: '',
    site: '',
    email: '',
    phone: '',
}

// Seção recolhível (igual à do modal do mapa), usada no Contato.
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

export function RegisterActorModal({ open, onClose }) {
    const { isAuthenticated } = useAuth()
    const [form, setForm] = useState(initialForm)
    const [position, setPosition] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [uploadingPhoto, setUploadingPhoto] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [error, setError] = useState('')
    const [done, setDone] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    function setField(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    // Sobe o arquivo na hora que é escolhido — a URL exibida no preview já é a
    // real (vinda do back-end), pronta pra mandar junto no submit do formulário.
    async function handlePhoto(event) {
        const file = event.target.files?.[0]
        if (!file) return
        setUploadingPhoto(true)
        setError('')
        try {
            const { url } = await uploadImage(file)
            setPhoto({ name: file.name, url })
        } catch (uploadError) {
            setError(uploadError.message ?? 'Não foi possível enviar a imagem.')
        } finally {
            setUploadingPhoto(false)
        }
    }

    function reset() {
        setForm(initialForm)
        setPosition(null)
        setPhoto(null)
        setUploadingPhoto(false)
        setShowContact(false)
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
            setError('Informe o nome do ator.')
            return
        }
        if (!form.address.trim()) {
            setError('Informe o endereço.')
            return
        }

        try {
            setSubmitting(true)
            setError('')
            await createActor({
                name: form.name,
                address: form.address,
                type: form.type,
                position,
                description: form.description,
                website: form.site,
                email: form.email,
                phone: form.phone,
                image: photo?.url ?? null,
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
                <ModalTitle>Cadastrar ator</ModalTitle>

                {!isAuthenticated ? (
                    <p className="text-secondary/70 text-sm">
                        <Link to="/login" className="text-primary font-semibold underline">
                            Entre na sua conta
                        </Link>{' '}
                        para cadastrar um ator.
                    </p>
                ) : done ? (
                    <div className="flex flex-col gap-3">
                        <p className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            Solicitação enviada! O ator passará pela moderação de um administrador
                            antes de aparecer no catálogo. 👍
                        </p>
                        <Button size="sm" onClick={handleClose}>
                            Fechar
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label
                            htmlFor="ra-nome"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Nome *
                            <Input
                                id="ra-nome"
                                value={form.name}
                                onChange={(event) => setField('name', event.target.value)}
                                placeholder="Ex: Hub de Inovação Joinville"
                                className="rounded-2xl"
                            />
                        </label>

                        <label
                            htmlFor="ra-endereco"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Endereço *
                            <Input
                                id="ra-endereco"
                                value={form.address}
                                onChange={(event) => setField('address', event.target.value)}
                                placeholder="Rua, número, bairro, cidade"
                                className="rounded-2xl"
                            />
                        </label>

                        <div className="flex flex-col gap-1">
                            <span className="text-secondary text-sm font-semibold">
                                Tipo de ator *
                            </span>
                            <Select
                                value={form.type}
                                onValueChange={(value) => setField('type', value)}
                            >
                                <SelectTrigger
                                    aria-label="Tipo de ator"
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

                        <div className="flex flex-col gap-1">
                            <span className="text-secondary text-sm font-semibold">
                                Localização no mapa
                            </span>
                            <LocationPicker position={position} onChange={setPosition} />
                            <span className="text-secondary/50 text-xs">
                                {position
                                    ? `Marcado em ${position[0].toFixed(4)}, ${position[1].toFixed(4)} (arraste o pino para ajustar).`
                                    : 'Toque no mapa para marcar o local do ator.'}
                            </span>
                        </div>

                        <label
                            htmlFor="ra-descricao"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Descrição (opcional)
                            <Textarea
                                id="ra-descricao"
                                value={form.description}
                                onChange={(event) => setField('description', event.target.value)}
                                placeholder="Conte o que esse ator faz no ecossistema..."
                                rows={3}
                            />
                        </label>

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
                                <label
                                    className={cn(
                                        'bg-secondary/10 text-secondary cursor-pointer rounded-full px-3 py-2 text-sm font-semibold',
                                        uploadingPhoto && 'pointer-events-none opacity-50',
                                    )}
                                >
                                    {uploadingPhoto
                                        ? 'Enviando...'
                                        : photo
                                          ? 'Trocar imagem'
                                          : 'Escolher imagem'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhoto}
                                        disabled={uploadingPhoto}
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
                                disabled={submitting || uploadingPhoto}
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
