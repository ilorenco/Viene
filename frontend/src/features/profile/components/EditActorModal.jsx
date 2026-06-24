// Popup "Editar ator" — aberto pelo bloco "Minhas publicações" do Perfil. Espelha
// o modal de CADASTRO de ator, mas já vem PRÉ-PREENCHIDO com os dados do ator e
// edita DIRETO (sem nova moderação, pois é uma publicação do próprio usuário).
// Campo novo: "Vincular eventos" — liga este ator aos eventos do próprio usuário.

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal, ModalContent, ModalDescription, ModalTitle } from '@/components/ui/Modal'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { MY_PUBLICATIONS_KEY, updateMyActor } from '@/features/profile/services/publications'
import { ATOR_TYPES } from '@/lib/atorTypes'
import { cn } from '@/lib/utils'
import { uploadImage } from '@/services/uploads'

// Seção recolhível (igual à do modal de cadastro), usada no Contato.
function CollapsibleSection({ title, open, onToggle, children }) {
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

export function EditActorModal({ open, onClose, actor, eventOptions = [] }) {
    const queryClient = useQueryClient()
    const [form, setForm] = useState({
        name: actor.name ?? '',
        type: actor.type ?? ATOR_TYPES[0].id,
        address: actor.address ?? '',
        description: actor.description ?? '',
        site: actor.website ?? '',
        email: actor.email ?? '',
        phone: actor.phone ?? '',
    })
    // Eventos vinculados (Set de ids), iniciado com os vínculos atuais.
    const [linked, setLinked] = useState(() => new Set(actor.linkedEventIds ?? []))
    const [photo, setPhoto] = useState(() => (actor.image ? { name: '', url: actor.image } : null))
    const [uploadingPhoto, setUploadingPhoto] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [error, setError] = useState('')

    const save = useMutation({
        mutationFn: (changes) => updateMyActor(actor.id, changes),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: MY_PUBLICATIONS_KEY })
            onClose()
        },
    })

    function setField(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function toggleLink(id) {
        setLinked((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
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

    function handleSubmit(event) {
        event.preventDefault()
        if (!form.name.trim()) {
            setError('Informe o nome do ator.')
            return
        }
        if (!form.address.trim()) {
            setError('Informe o endereço.')
            return
        }
        setError('')
        save.mutate({
            name: form.name.trim(),
            type: form.type,
            address: form.address.trim(),
            description: form.description.trim(),
            website: form.site.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            image: photo?.url ?? null,
            linkedEventIds: [...linked],
        })
    }

    return (
        <Modal
            open={open}
            onOpenChange={(value) => {
                if (!value && !save.isPending) onClose()
            }}
        >
            <ModalContent aria-describedby={undefined} className="lg:max-w-2xl">
                <ModalTitle>Editar ator</ModalTitle>
                <ModalDescription>
                    Alterações em uma publicação sua entram direto, sem nova aprovação.
                </ModalDescription>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {/* Desktop (lg): texto numa coluna, foto+vínculos+contato na
                        outra — usa o espaço horizontal extra do modal mais largo.
                        Mobile: as duas colunas empilham na ordem natural. */}
                    <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
                        <div className="flex flex-1 flex-col gap-3">
                            <label
                                htmlFor="ea-nome"
                                className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                            >
                                Nome *
                                <Input
                                    id="ea-nome"
                                    value={form.name}
                                    onChange={(event) => setField('name', event.target.value)}
                                    className="rounded-2xl"
                                />
                            </label>

                            <label
                                htmlFor="ea-endereco"
                                className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                            >
                                Endereço *
                                <Input
                                    id="ea-endereco"
                                    value={form.address}
                                    onChange={(event) => setField('address', event.target.value)}
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

                            <label
                                htmlFor="ea-descricao"
                                className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                            >
                                Descrição
                                <Textarea
                                    id="ea-descricao"
                                    value={form.description}
                                    onChange={(event) =>
                                        setField('description', event.target.value)
                                    }
                                    rows={3}
                                />
                            </label>
                        </div>

                        <div className="flex flex-1 flex-col gap-3">
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

                            {/* Campo novo: vincular este ator aos SEUS eventos. */}
                            <div className="flex flex-col gap-2">
                                <span className="text-secondary text-sm font-semibold">
                                    Vincular eventos
                                </span>
                                {eventOptions.length === 0 ? (
                                    <p className="text-secondary/50 text-xs">
                                        Você ainda não tem eventos para vincular.
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {eventOptions.map((option) => {
                                            const active = linked.has(option.id)
                                            return (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() => toggleLink(option.id)}
                                                    aria-pressed={active}
                                                    className={cn(
                                                        'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
                                                        active
                                                            ? 'bg-secondary border-secondary text-background'
                                                            : 'border-secondary/30 text-secondary hover:border-secondary',
                                                    )}
                                                >
                                                    {option.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            <CollapsibleSection
                                title="Contato"
                                open={showContact}
                                onToggle={() => setShowContact((value) => !value)}
                            >
                                <Input
                                    aria-label="Site"
                                    value={form.site}
                                    onChange={(event) => setField('site', event.target.value)}
                                    placeholder="Site"
                                    className="rounded-2xl"
                                />
                                <Input
                                    aria-label="E-mail"
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => setField('email', event.target.value)}
                                    placeholder="E-mail"
                                    className="rounded-2xl"
                                />
                                <Input
                                    aria-label="Telefone"
                                    value={form.phone}
                                    onChange={(event) => setField('phone', event.target.value)}
                                    placeholder="Telefone"
                                    className="rounded-2xl"
                                />
                            </CollapsibleSection>
                        </div>
                    </div>

                    {error && <p className="text-danger text-sm">{error}</p>}

                    <div className="mt-1 flex gap-2">
                        <Button
                            type="button"
                            size="sm"
                            onClick={onClose}
                            disabled={save.isPending}
                            className="bg-secondary/10 text-secondary flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={save.isPending || uploadingPhoto}
                            className="flex-1"
                        >
                            {save.isPending ? 'Salvando...' : 'Salvar alterações'}
                        </Button>
                    </div>
                </form>
            </ModalContent>
        </Modal>
    )
}
