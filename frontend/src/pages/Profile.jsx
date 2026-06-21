// Página "Meu perfil": resumo da conta, atividade (eventos, favoritos, histórico)
// e perguntas. O LAYOUT segue o mesmo padrão da tela de Configurações — banner de
// título + seções com cartões brancos — mantendo o conteúdo próprio do perfil.

import {
    CalendarCheck,
    CalendarDays,
    CalendarRange,
    ChevronRight,
    Heart,
    LogOut,
    Settings,
    SquarePlus,
    Store,
    Ticket,
    TreePine,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { MyQuestions } from '@/features/profile/components/MyQuestions'
import { useLogout } from '@/hooks/useLogout'

const stats = [
    { icon: CalendarRange, value: 12, label: 'Eventos participados' },
    { icon: Ticket, value: 8, label: 'Ingressos comprados' },
    { icon: Heart, value: 15, label: 'Favoritos salvos' },
]

const eventActions = [
    {
        icon: CalendarDays,
        title: 'Próximos eventos',
        description: 'Veja seus próximos eventos',
        to: '/events',
    },
    {
        icon: SquarePlus,
        title: 'Criar evento',
        description: 'Cadastre um novo evento',
        to: '/events',
    },
]

const favoriteCollections = [
    { icon: Store, title: 'Empresas', description: 'Empresas que você segue', to: '/favorites' },
    { icon: TreePine, title: 'Parques', description: 'Parques que você salvou', to: '/favorites' },
]

const eventHistory = [
    {
        icon: CalendarCheck,
        title: 'Show de Rock no Parque Central',
        description: 'Parque Central',
        meta: '20 mai 2026',
        to: '/events',
    },
    {
        icon: CalendarCheck,
        title: 'Feira de Inovação Tech',
        description: 'Centro de Convenções',
        meta: '12 abr 2026',
        to: '/events',
    },
    {
        icon: CalendarCheck,
        title: 'Trilha Ecológica Guiada',
        description: 'Parque Natural das Águas',
        meta: '28 mar 2026',
        to: '/events',
    },
]

// Cabeçalho de seção no MESMO padrão da tela de Configurações: título (montserrat,
// grande) + descrição opcional à esquerda e uma ação opcional à direita (ex.: o
// botão "Salvar" das Configurações; aqui, "Ver todos" / "Editar").
function Section({ title, description, action, children }) {
    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-secondary font-montserrat text-xl font-extrabold">
                        {title}
                    </h2>
                    {description && <p className="text-secondary/60 text-sm">{description}</p>}
                </div>
                {action}
            </div>
            {children}
        </section>
    )
}

// Link "Ver todos" usado como ação à direita das seções de listas.
function SeeAll({ to }) {
    return (
        <Link
            to={to}
            className="text-primary flex shrink-0 items-center gap-0.5 text-sm font-medium"
        >
            Ver todos <ChevronRight className="size-4" />
        </Link>
    )
}

// Lista de cartões brancos compartilhada pelas seções de listas.
const listClass =
    'border-secondary/10 divide-secondary/10 overflow-hidden rounded-2xl border bg-white text-sm'

function CollectionItem({ icon: Icon, title, description, to, meta }) {
    return (
        <li>
            <Link to={to} className="flex items-center gap-3 p-4">
                <div className="bg-primary/10 text-primary shrink-0 rounded-full p-3">
                    <Icon className="size-6" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="text-secondary font-bold">{title}</p>
                    <p className="text-secondary/50 text-xs leading-tight">{description}</p>
                </div>
                {meta && <span className="text-secondary/50 shrink-0 text-xs">{meta}</span>}
                <ChevronRight className="text-secondary/70 size-5 shrink-0" />
            </Link>
        </li>
    )
}

export function Profile() {
    const handleLogout = useLogout()
    // Rota protegida (ProtectedRoute) → sempre há um usuário logado aqui.
    const { user } = useAuth()
    const displayName = user?.name ?? 'Usuário'
    const email = user?.email

    return (
        <>
            {/* Banner no estilo da tela de Configurações: só título + subtítulo. */}
            <div className="bg-secondary -mx-4 flex flex-col gap-3 rounded-none p-6 lg:-mx-[5vw] lg:rounded-xl lg:p-8">
                <PageHeader title="Meu perfil" className="text-white lg:hidden" />
                <div className="hidden flex-col gap-3 lg:flex">
                    <h1 className="font-montserrat text-3xl leading-tight font-extrabold whitespace-nowrap text-white lg:text-4xl">
                        Meu perfil
                    </h1>
                    <p className="max-w-md text-sm text-white/60">
                        Veja o seu resumo, atividade e perguntas na plataforma.
                    </p>
                </div>
            </div>

            {/* Resumo da conta: cartão branco com avatar + nome + estatísticas
                (mesmo molde do cartão "Informações pessoais" das Configurações). */}
            <Section
                title="Minha conta"
                description="Seus dados e atividade."
                action={
                    <Link
                        to="/configuracoes"
                        className="bg-secondary text-primary hover:bg-secondary/90 flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-base font-semibold transition active:scale-95"
                    >
                        <Settings className="size-5" />
                        Editar
                    </Link>
                }
            >
                <div className="border-secondary/10 flex flex-col gap-5 rounded-2xl border bg-white p-6 lg:p-8">
                    <div className="flex items-center gap-4">
                        <Avatar size="lg" name={displayName} />
                        <div className="flex min-w-0 flex-col gap-0.5">
                            <p className="text-secondary font-montserrat text-lg leading-tight font-bold">
                                {displayName}
                            </p>
                            {email && <p className="text-secondary/50 truncate text-sm">{email}</p>}
                            <p className="text-secondary/50 text-sm">Membro desde 2024</p>
                        </div>
                    </div>

                    <ul className="border-secondary/10 divide-secondary/10 flex divide-x border-t pt-5">
                        {stats.map(({ icon: Icon, value, label }) => (
                            <li
                                key={label}
                                className="flex flex-1 flex-col items-center gap-1 px-3"
                            >
                                <div className="text-primary flex items-center gap-1.5">
                                    <Icon className="size-5" />
                                    <span className="text-secondary font-bold">{value}</span>
                                </div>
                                <span className="text-secondary/50 text-center text-xs">
                                    {label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>

            <Section title="Meus eventos" action={<SeeAll to="/events" />}>
                <ul className={`${listClass} grid grid-cols-2 divide-x`}>
                    {eventActions.map((item) => (
                        <CollectionItem key={item.title} {...item} />
                    ))}
                </ul>
            </Section>

            <Section title="Meus favoritos" action={<SeeAll to="/favorites" />}>
                <ul className={`${listClass} grid grid-cols-2 divide-x`}>
                    {favoriteCollections.map((item) => (
                        <CollectionItem key={item.title} {...item} />
                    ))}
                </ul>
            </Section>

            <Section title="Histórico de eventos" action={<SeeAll to="/tickets" />}>
                <ul className={`${listClass} flex flex-col divide-y`}>
                    {eventHistory.map((item) => (
                        <CollectionItem key={item.title} {...item} />
                    ))}
                </ul>
            </Section>

            <MyQuestions />

            <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 self-center"
            >
                <LogOut className="size-4" />
                Sair da conta
            </Button>
        </>
    )
}
