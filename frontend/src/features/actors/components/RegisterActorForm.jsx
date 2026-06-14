// Formulário de cadastro de ator. Sem back-end ainda: ao enviar, apenas confirma
// (a persistência entra quando a API existir — ver services/). RN_003: a solicitação
// passaria pela moderação de um admin.
//
// Vive dentro do ModalContent, então desmonta quando o modal fecha — por isso o
// estado se reinicia sozinho ao reabrir (sem reset manual).

import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ACTOR_TYPES } from '@/features/actors/mocks/actorTypes'
import { LocationPicker } from '@/features/map/components/LocationPicker'
import { cn } from '@/lib/utils'

const selectClass = 'border-secondary text-secondary rounded-2xl border-2 bg-transparent px-4 py-3'

const initialForm = {
    name: '',
    address: '',
    type: ACTOR_TYPES[0].id,
    description: '',
    site: '',
    email: '',
    phone: '',
}

// Seção recolhível, usada no Contato.
function Section({ title, open, onToggle, children }) {
    return (
        <div className="border-secondary/10 rounded-2xl border">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="text-secondary flex w-full items-center justify-between p-3 text-sm font-semibold"
            >
                {title}
                <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
            </button>
            {open && <div className="flex flex-col gap-3 px-3 pb-3">{children}</div>}
        </div>
    )
}

// Campo do formulário: rótulo + controle (Input/Textarea/select) associados via id.
function Field({ id, label, children }) {
    return (
        <label htmlFor={id} className="text-secondary flex flex-col gap-1 text-sm font-semibold">
            {label}
            {children}
        </label>
    )
}

export function RegisterActorForm({ onClose }) {
    const [form, setForm] = useState(initialForm)
    const [position, setPosition] = useState(null)
    const [photoUrl, setPhotoUrl] = useState(null)
    const [showContact, setShowContact] = useState(false)
    const [error, setError] = useState('')
    const [done, setDone] = useState(false)

    function setField(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function handlePhotoChange(event) {
        const file = event.target.files?.[0]
        if (file) setPhotoUrl(URL.createObjectURL(file))
    }

    // Libera a URL temporária da imagem ao trocá-la ou desmontar (evita vazamento).
    useEffect(() => {
        if (!photoUrl) return
        return () => URL.revokeObjectURL(photoUrl)
    }, [photoUrl])

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
        // Sem back-end ainda: monta o payload (ponto de integração) e confirma o envio.
        const payload = { ...form, position, photo: photoUrl }
        // TODO: POST /atores quando o back-end existir (ver features/actors/services).
        console.log('[mock] cadastro de ator:', payload)
        setDone(true)
    }

    if (done) {
        return (
            <div className="flex flex-col gap-3">
                <p className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    Solicitação enviada! O ator passará pela moderação de um administrador antes de
                    aparecer no catálogo. 👍
                </p>
                <Button size="sm" onClick={onClose}>
                    Fechar
                </Button>
            </div>
        )
    }

    const positionHint = position
        ? `Marcado em ${position[0].toFixed(4)}, ${position[1].toFixed(4)} (arraste o pino para ajustar).`
        : 'Toque no mapa para marcar o local do ator.'

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Field id="register-actor-name" label="Nome *">
                <Input
                    id="register-actor-name"
                    value={form.name}
                    onChange={(event) => setField('name', event.target.value)}
                    placeholder="Ex: Hub de Inovação Joinville"
                    className="rounded-2xl"
                />
            </Field>

            <Field id="register-actor-address" label="Endereço *">
                <Input
                    id="register-actor-address"
                    value={form.address}
                    onChange={(event) => setField('address', event.target.value)}
                    placeholder="Rua, número, bairro, cidade"
                    className="rounded-2xl"
                />
            </Field>

            <Field id="register-actor-type" label="Tipo de ator *">
                <select
                    id="register-actor-type"
                    value={form.type}
                    onChange={(event) => setField('type', event.target.value)}
                    className={selectClass}
                >
                    {ACTOR_TYPES.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </Field>

            <div className="flex flex-col gap-1">
                <span className="text-secondary text-sm font-semibold">Localização no mapa</span>
                <LocationPicker position={position} onChange={setPosition} />
                <span className="text-secondary/50 text-xs">{positionHint}</span>
            </div>

            <Field id="register-actor-description" label="Descrição (opcional)">
                <Textarea
                    id="register-actor-description"
                    value={form.description}
                    onChange={(event) => setField('description', event.target.value)}
                    placeholder="Conte o que esse ator faz no ecossistema..."
                    rows={3}
                />
            </Field>

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
                    {photoUrl && (
                        <img src={photoUrl} alt="" className="size-14 rounded-xl object-cover" />
                    )}
                    <label className="bg-secondary/10 text-secondary cursor-pointer rounded-full px-3 py-2 text-sm font-semibold">
                        {photoUrl ? 'Trocar imagem' : 'Escolher imagem'}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
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
                    onClick={onClose}
                    className="bg-secondary/10 text-secondary flex-1"
                >
                    Cancelar
                </Button>
                <Button type="submit" size="sm" className="flex-1">
                    Solicitar cadastro
                </Button>
            </div>
        </form>
    )
}
