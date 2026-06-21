// Página "Configurações da conta": dados pessoais, acessibilidade, termos e sair.

import { LogOut } from 'lucide-react'
import { useRef, useState } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal, ModalContent, ModalDescription, ModalTitle } from '@/components/ui/Modal'
import { useAuth } from '@/contexts/AuthContext'
import { AccessibilityControls } from '@/features/accessibility/components/AccessibilityControls'
import { useLogout } from '@/hooks/useLogout'

const legalDocs = {
    termos: {
        title: 'Termos de Uso',
        text: 'Ao utilizar a plataforma VIENE, você concorda em fornecer informações verdadeiras e manter os seus dados atualizados.\n\nO conteúdo publicado (eventos, perfis e pontos no mapa) é de responsabilidade de quem o cadastra e pode passar por moderação antes da publicação.\n\nÉ proibido usar a plataforma para fins ilícitos, ofensivos ou que violem direitos de terceiros. O descumprimento pode resultar na suspensão da conta.\n\n(Texto provisório para o protótipo — a versão final será definida pela equipe.)',
    },
    privacidade: {
        title: 'Política de Privacidade',
        text: 'Levamos a sua privacidade a sério e seguimos a LGPD. Coletamos apenas os dados necessários para o funcionamento da plataforma.\n\nDados sensíveis, como a senha, são protegidos por criptografia. Não compartilhamos suas informações pessoais sem o seu consentimento.\n\nVocê pode solicitar a atualização ou a exclusão dos seus dados a qualquer momento.\n\n(Texto provisório para o protótipo — a versão final será definida pela equipe.)',
    },
}

// Cabeçalho de um bloco: título (um pouco maior) + descrição opcional. Usado nos
// blocos de Acessibilidade e Termos. O bloco de "Informações pessoais" tem um
// cabeçalho próprio (com o botão Salvar ao lado), por isso não usa este.
function Section({ title, description, children }) {
    return (
        <section className="flex flex-col gap-3">
            <div>
                <h2 className="text-secondary font-montserrat text-xl font-extrabold">{title}</h2>
                {description && <p className="text-secondary/60 text-sm">{description}</p>}
            </div>
            {children}
        </section>
    )
}

export function Settings() {
    const handleLogout = useLogout()
    // Rota protegida (ProtectedRoute) → sempre há um usuário logado aqui. Os dados
    // pessoais começam com o nome/e-mail da conta; telefone/nascimento são mock
    // (entram de verdade quando o back-end de perfil existir).
    const { user } = useAuth()
    const fileInputRef = useRef(null)
    const [form, setForm] = useState({
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: '(47) 99999-0000',
        birthdate: '',
    })
    const [photo, setPhoto] = useState(null)
    const [saved, setSaved] = useState(false)
    const [doc, setDoc] = useState(null)

    function setField(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }))
        setSaved(false)
    }

    // Carrega a imagem escolhida e gera uma URL local só para a pré-visualização
    // (mock; quando houver back-end, aqui se faria o upload do arquivo).
    function handlePhotoChange(event) {
        const file = event.target.files?.[0]
        if (!file) return
        setPhoto((prev) => {
            if (prev) URL.revokeObjectURL(prev)
            return URL.createObjectURL(file)
        })
        setSaved(false)
    }

    function handleSave(event) {
        event.preventDefault()
        // Mock: aqui chamaríamos o serviço de usuário (PUT /api/v1/user/profile).
        setSaved(true)
    }

    return (
        <>
            {/* Banner escuro no estilo dos catálogos, sem barra de busca. */}
            <div className="bg-secondary -mx-4 flex flex-col gap-3 rounded-none p-6 lg:-mx-[5vw] lg:rounded-xl lg:p-8">
                <PageHeader title="Configurações" className="text-white lg:hidden" />
                <div className="hidden flex-col gap-3 lg:flex">
                    <h1 className="font-montserrat text-3xl leading-tight font-extrabold whitespace-nowrap text-white lg:text-4xl">
                        Configurações
                    </h1>
                    <p className="max-w-md text-sm text-white/60">
                        Gerencie seus dados, acessibilidade e preferências da conta.
                    </p>
                </div>
            </div>

            {/* Informações pessoais: o botão "Salvar alterações" fica no topo, à
                direita, ACIMA do bloco; o bloco branco tem bastante respiro interno. */}
            <section>
                <form onSubmit={handleSave} className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-secondary font-montserrat text-xl font-extrabold">
                                Informações pessoais
                            </h2>
                            <p className="text-secondary/60 text-sm">
                                Atualize os seus dados de cadastro.
                            </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                            <Button type="submit" size="sm">
                                Salvar alterações
                            </Button>
                            {saved && (
                                <span className="animate-fade-in text-sm font-medium text-green-600">
                                    Alterações salvas!
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="border-secondary/10 flex flex-col gap-4 rounded-2xl border bg-white p-6 lg:p-8">
                        <div className="flex items-center gap-3">
                            <Avatar size="md" name={form.name} src={photo} />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-primary text-sm font-semibold"
                            >
                                {photo ? 'Trocar foto' : 'Carregar foto'}
                            </button>
                            {/* Input de arquivo escondido: o botão acima é quem o aciona. */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                        <label
                            htmlFor="cfg-nome"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Nome
                            <Input
                                id="cfg-nome"
                                value={form.name}
                                onChange={(event) => setField('name', event.target.value)}
                            />
                        </label>
                        <label
                            htmlFor="cfg-email"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            E-mail
                            <Input
                                id="cfg-email"
                                type="email"
                                value={form.email}
                                onChange={(event) => setField('email', event.target.value)}
                            />
                        </label>
                        <label
                            htmlFor="cfg-telefone"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Telefone
                            <Input
                                id="cfg-telefone"
                                value={form.phone}
                                onChange={(event) => setField('phone', event.target.value)}
                            />
                        </label>
                        <label
                            htmlFor="cfg-nascimento"
                            className="text-secondary flex flex-col gap-1 text-sm font-semibold"
                        >
                            Data de nascimento
                            <Input
                                id="cfg-nascimento"
                                type="date"
                                value={form.birthdate}
                                onChange={(event) => setField('birthdate', event.target.value)}
                            />
                        </label>
                    </div>
                </form>
            </section>

            <Section
                title="Acessibilidade"
                description="Os mesmos ajustes do botão de acessibilidade da tela."
            >
                {/* Fundo cinza-escuro arredondado: de lado a lado só no mobile (-mx-4);
                    no desktop fica recolhido (mx-0) e arredondado. */}
                <div className="bg-secondary -mx-4 rounded-none p-5 lg:mx-0 lg:rounded-2xl lg:p-6">
                    <AccessibilityControls compact />
                </div>
            </Section>

            <Section title="Termos e privacidade">
                <div className="border-secondary/10 divide-secondary/10 flex flex-col divide-y overflow-hidden rounded-2xl border bg-white">
                    <button
                        type="button"
                        onClick={() => setDoc('termos')}
                        className="text-secondary p-6 text-left font-medium lg:p-8"
                    >
                        Termos de Uso
                    </button>
                    <button
                        type="button"
                        onClick={() => setDoc('privacidade')}
                        className="text-secondary p-6 text-left font-medium lg:p-8"
                    >
                        Política de Privacidade
                    </button>
                </div>
            </Section>

            <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 self-center"
            >
                <LogOut className="size-4" />
                Sair da conta
            </Button>

            <Modal
                open={Boolean(doc)}
                onOpenChange={(value) => {
                    if (!value) setDoc(null)
                }}
            >
                <ModalContent>
                    <ModalTitle>{doc ? legalDocs[doc].title : ''}</ModalTitle>
                    <ModalDescription className="max-h-[55vh] overflow-y-auto whitespace-pre-line">
                        {doc ? legalDocs[doc].text : ''}
                    </ModalDescription>
                </ModalContent>
            </Modal>
        </>
    )
}
