import {
    CalendarDays,
    Heart,
    HelpCircle,
    Info,
    LogIn,
    LogOut,
    MapPin,
    Search,
    Settings,
    Shield,
    Ticket,
} from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { MainMenuItem } from '@/components/layout/MainMenuItem'
import { Avatar } from '@/components/ui/Avatar'
import { SheetClose, SheetContent, SheetTitle } from '@/components/ui/Sheet'
import { useAuth } from '@/contexts/AuthContext'
import { useLogout } from '@/hooks/useLogout'

const exploreSection = {
    title: 'EXPLORAR',
    items: [
        { to: '/actors', label: 'Encontre empresas', icon: Search },
        { to: '/events', label: 'Eventos', icon: CalendarDays },
        { to: '/map', label: 'Mapeamento', icon: MapPin },
    ],
}

// "MINHA CONTA" só entra no menu para usuários logados (as rotas são protegidas;
// mostrá-las ao visitante daria "falsa expectativa" — clicaria e cairia no login).
// Ingressos/Favoritos são atividade de consumo do catálogo — não fazem sentido
// pra uma conta admin, então saem do menu (a rota em si continua acessível,
// igual a outras restrições de UI deste app: o back-end é que garante a regra).
const ACCOUNT_ITEMS = [
    { to: '/tickets', label: 'Meus ingressos', icon: Ticket },
    { to: '/favorites', label: 'Meus favoritos', icon: Heart },
    { to: '/configuracoes', label: 'Configurações', icon: Settings },
]

const institutionalSection = {
    title: 'INSTITUCIONAL',
    items: [
        { to: '/sobre', label: 'Sobre a Viene', icon: Info },
        { to: '/ajuda', label: 'Perguntas frequentes', icon: HelpCircle },
    ],
}

// "ADMINISTRAÇÃO" só entra no menu para administradores.
const adminSection = {
    title: 'ADMINISTRAÇÃO',
    items: [{ to: '/admin', label: 'Painel do administrador', icon: Shield }],
}

export function MainMenu() {
    const { isAuthenticated, isAdmin, user } = useAuth()
    const handleLogout = useLogout()

    // Monta as seções conforme o estado de login: "MINHA CONTA" só para logados e
    // "ADMINISTRAÇÃO" só para admin. (Segurança real do RBAC virá do backend — o
    // `role` salvo no navegador NÃO é fonte de verdade; ver AuthContext/auth.js.)
    const accountSection = {
        title: 'MINHA CONTA',
        items: isAdmin
            ? ACCOUNT_ITEMS.filter((item) => item.to !== '/tickets' && item.to !== '/favorites')
            : ACCOUNT_ITEMS,
    }
    const sections = [
        exploreSection,
        ...(isAuthenticated ? [accountSection] : []),
        institutionalSection,
        ...(isAdmin ? [adminSection] : []),
    ]
    const firstName = user?.name?.split(' ')[0] ?? user?.name

    return (
        <SheetContent className="gap-8 overflow-y-auto">
            <SheetTitle className="sr-only">Menu</SheetTitle>

            {/* Cabeçalho do menu: logado mostra o nome e leva ao perfil; deslogado
                convida a entrar/criar conta. */}
            {isAuthenticated ? (
                <SheetClose asChild>
                    <Link to="/profile" className="flex items-center gap-3 text-left">
                        <Avatar size="md" name={user?.name} src={user?.avatar} />
                        <div className="flex flex-col">
                            <p className="text-foreground font-bold">Olá, {firstName}</p>
                            <p className="text-secondary text-sm">Veja o seu perfil e atividade</p>
                        </div>
                    </Link>
                </SheetClose>
            ) : (
                <SheetClose asChild>
                    <Link to="/login" className="flex items-center gap-3 text-left">
                        <Avatar size="md" />
                        <div className="flex flex-col">
                            <p className="text-foreground font-bold">Visitante</p>
                            <p className="text-secondary text-sm">
                                Entre ou crie sua conta para começar
                            </p>
                        </div>
                    </Link>
                </SheetClose>
            )}

            <nav aria-label="Menu principal" className="flex flex-col gap-8">
                {sections.map((section, index) => (
                    <Fragment key={section.title}>
                        {index > 0 && <hr className="border-secondary/15" />}
                        <section className="flex flex-col gap-3">
                            <h2 className="text-primary text-xs font-medium">{section.title}</h2>
                            <ul className="flex flex-col gap-4">
                                {section.items.map((item) => (
                                    <MainMenuItem key={item.to} {...item} />
                                ))}
                            </ul>
                        </section>
                    </Fragment>
                ))}

                {/* Entrar (deslogado) ou Sair (logado). */}
                <hr className="border-secondary/15" />
                {isAuthenticated ? (
                    <SheetClose asChild>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-danger flex items-center gap-3 font-medium"
                        >
                            <LogOut className="size-5" />
                            Sair da conta
                        </button>
                    </SheetClose>
                ) : (
                    <SheetClose asChild>
                        <Link
                            to="/login"
                            className="text-primary flex items-center gap-3 font-medium"
                        >
                            <LogIn className="size-5" />
                            Entrar
                        </Link>
                    </SheetClose>
                )}
            </nav>
        </SheetContent>
    )
}
