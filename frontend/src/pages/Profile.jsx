// Página "Meu perfil": resumo da conta, atividade (eventos, favoritos, histórico)
// e perguntas. O LAYOUT segue o mesmo padrão da tela de Configurações — banner de
// título + seções com cartões brancos — mantendo o conteúdo próprio do perfil.

import { CalendarDays, LogOut, Settings, SquarePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHeader } from '@/components/layout/PageHeader'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { EventHistorySummary } from '@/features/profile/components/EventHistorySummary'
import { FavoritesSummary } from '@/features/profile/components/FavoritesSummary'
import { MyPublications } from '@/features/profile/components/MyPublications'
import { MyQuestions } from '@/features/profile/components/MyQuestions'
import {
    CollectionItem,
    listClass,
    Section,
    SeeAll,
} from '@/features/profile/components/ProfileLayout'
import { ProfileStats } from '@/features/profile/components/ProfileStats'
import { useLogout } from '@/hooks/useLogout'

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

export function Profile() {
    const handleLogout = useLogout()
    // Rota protegida (ProtectedRoute) → sempre há um usuário logado aqui.
    const { user } = useAuth()
    const displayName = user?.name ?? 'Usuário'
    const email = user?.email
    // Usuários do tipo "ator" ganham o bloco de gestão das próprias publicações.
    const isActor = user?.role === 'ator'
    const memberSince = user?.createdAt ? new Date(user.createdAt).getFullYear() : null

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
                        <Avatar size="lg" name={displayName} src={user?.avatar} />
                        <div className="flex min-w-0 flex-col gap-0.5">
                            <p className="text-secondary font-montserrat text-lg leading-tight font-bold">
                                {displayName}
                            </p>
                            {email && <p className="text-secondary/50 truncate text-sm">{email}</p>}
                            {memberSince && (
                                <p className="text-secondary/50 text-sm">
                                    Membro desde {memberSince}
                                </p>
                            )}
                        </div>
                    </div>

                    <ProfileStats />
                </div>
            </Section>

            {/* Bloco exclusivo de atores: gestão das próprias publicações. */}
            {isActor && <MyPublications />}

            <Section title="Meus eventos" action={<SeeAll to="/events" />}>
                <ul className={`${listClass} grid grid-cols-2 divide-x`}>
                    {eventActions.map((item) => (
                        <CollectionItem key={item.title} {...item} />
                    ))}
                </ul>
            </Section>

            <Section title="Meus favoritos" action={<SeeAll to="/favorites" />}>
                <FavoritesSummary />
            </Section>

            <EventHistorySummary />

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
