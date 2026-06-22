// Popup "Editar evento" — aberto pelo bloco "Minhas publicações" do Perfil.
// Espelha o modal de CADASTRO de evento, já PRÉ-PREENCHIDO, e edita DIRETO (sem
// nova moderação). Campo novo: "Vincular atores" — liga este evento aos atores do
// próprio usuário.

import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { MY_PUBLICATIONS_KEY, updateMyEvent } from '@/features/profile/services/publications'
import { cn } from '@/lib/utils'
import { uploadImage } from '@/services/uploads'

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

// Recalcula o texto exibido nos cards (mesmo formato do mock de eventos) a partir
// dos campos editados, para o card refletir a alteração.
function buildDatetime(date, start, end) {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    const shown = `${day} ${MONTHS[Number(month) - 1]}. ${year}`
    // Sem horários, mostra só a data (evita "  - data > - data" malformado).
    if (!start && !end) return shown
    return `${start || '—'} - ${shown} > ${end || '—'} - ${shown}`
}

export function EditEventModal({ open, onClose, event, actorOptions = [] }) {
    const queryClient = useQueryClient()
    const [form, setForm] = useState({
        title: event.title ?? '',
        category: event.category ?? mockEventCategories[0].value,
        address: event.address ?? '',
        date: event.date ?? '',
        start: event.start ?? '',
        end: event.end ?? '',
        description: event.description ?? '',
        ticketUrl: event.ticketUrl ?? '',
    })
    const [linked, setLinked] = useState(() => new Set(event.linkedActorIds ?? []))
    const [photo, setPhoto] = useState(() => (event.image ? { name: '', url: event.image } : null))
    const [uploadingPhoto, setUploadingPhoto] = useState(false)
    const [error, setError] = useState('')

    const save = useMutation({
        mutationFn: (changes) => updateMyEvent(event.id, changes),
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
    async function handlePhoto(changeEvent) {
        const file = changeEvent.target.files?.[0]
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

    function handleSubmit(submitEvent) {
        submitEvent.preventDefault()
        if (!form.title.trim()) {
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
        if (form.start && form.end && form.end < form.start) {
            setError('O horário de término deve ser igual ou posterior ao de início.')
            return
        }
        setError('')
        save.mutate({
            title: form.title.trim(),
            category: form.category,
            address: form.address.trim(),
            date: form.date,
            start: form.start,
            end: form.end,
            datetime: buildDatetime(form.date, form.start, form.end),
            description: form.description.trim(),
            ticketUrl: form.ticketUrl.trim(),
            image: photo?.url ?? null,
            linkedActorIds: [...linked],
        })
    }

    return (
        <Modal
            open={open}
            onOpenChange={(value) => {
                if (!value && !save.isPending) onClose()
            }}
        >
            <ModalContent aria-describedby={undefined}>
                <ModalTitle>Editar evento</ModalTitle>
                <ModalDescription>
                    Alterações em uma publicação sua entram direto, sem nova aprovação.
                </ModalDescription>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label
                        htmlFor="ee-nome"
                        className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                    >
                        Nome *
                        <Input
                            id="ee-nome"
                            value={form.title}
                            onChange={(submitEvent) => setField('title', submitEvent.target.value)}
                            className="rounded-2xl"
                        />
                    </label>

                    <label
                        htmlFor="ee-endereco"
                        className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                    >
                        Endereço *
                        <Input
                            id="ee-endereco"
                            value={form.address}
                            onChange={(submitEvent) =>
                                setField('address', submitEvent.target.value)
                            }
                            className="rounded-2xl"
                        />
                    </label>

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

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label
                            htmlFor="ee-data"
                            className="text-secondary flex flex-1 flex-col gap-1 text-sm font-semibold"
                        >
                            Data *
                            <Input
                                id="ee-data"
                                type="date"
                                value={form.date}
                                onChange={(submitEvent) =>
                                    setField('date', submitEvent.target.value)
                                }
                                className="rounded-2xl"
                            />
                        </label>
                        <label
                            htmlFor="ee-inicio"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Início
                            <Input
                                id="ee-inicio"
                                type="time"
                                value={form.start}
                                onChange={(submitEvent) =>
                                    setField('start', submitEvent.target.value)
                                }
                                className="rounded-2xl"
                            />
                        </label>
                        <label
                            htmlFor="ee-fim"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Término
                            <Input
                                id="ee-fim"
                                type="time"
                                value={form.end}
                                onChange={(submitEvent) =>
                                    setField('end', submitEvent.target.value)
                                }
                                className="rounded-2xl"
                            />
                        </label>
                    </div>

                    <label
                        htmlFor="ee-descricao"
                        className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                    >
                        Descrição
                        <Textarea
                            id="ee-descricao"
                            value={form.description}
                            onChange={(submitEvent) =>
                                setField('description', submitEvent.target.value)
                            }
                            rows={3}
                        />
                    </label>

                    <label
                        htmlFor="ee-ingresso"
                        className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                    >
                        Link do ingresso
                        <Input
                            id="ee-ingresso"
                            value={form.ticketUrl}
                            onChange={(submitEvent) =>
                                setField('ticketUrl', submitEvent.target.value)
                            }
                            placeholder="https://www.sympla.com.br/evento/..."
                            className="rounded-2xl"
                        />
                    </label>

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

                    {/* Campo novo: vincular este evento aos SEUS atores. */}
                    <div className="flex flex-col gap-2">
                        <span className="text-secondary text-sm font-semibold">
                            Vincular atores
                        </span>
                        {actorOptions.length === 0 ? (
                            <p className="text-secondary/50 text-xs">
                                Você ainda não tem atores para vincular.
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {actorOptions.map((option) => {
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
