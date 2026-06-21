import { CalendarDays, Map, Menu, Users } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import blackLogo from '@/assets/branding/logo-black.png'
import blueLogo from '@/assets/branding/logo-blue.png'
import { MainMenu } from '@/components/layout/MainMenu'
import { Avatar } from '@/components/ui/Avatar'
import { Sheet, SheetTrigger } from '@/components/ui/Sheet'
import { useAuth } from '@/contexts/AuthContext'
import { useAccessibility } from '@/features/accessibility/AccessibilityContext'
import { cn } from '@/lib/utils'

// Item da navbar: fica LARANJA quando a página atual é (ou está dentro de) a rota.
function navItemClass({ isActive }) {
    return cn(
        'flex items-center gap-1.5 transition-colors',
        isActive ? 'text-primary' : 'hover:text-primary',
    )
}

export function Header() {
    // No modo noturno usa a logo AZUL (a preta sumiria no header escuro).
    const { settings } = useAccessibility()
    const { isAuthenticated, user } = useAuth()
    const logo = settings.nightMode ? blueLogo : blackLogo

    return (
        <header className="bg-background border-secondary/10 sticky top-0 z-40 flex items-center justify-between gap-2 border-b p-4">
            <Link to="/" className="shrink-0">
                <img src={logo} alt="Viene" className="h-8" />
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
                {/* Mobile: ícones relacionados a cada página. Desktop: o nome. */}
                <nav
                    aria-label="Navegação principal"
                    className="text-secondary flex items-center gap-4 text-xs font-bold sm:text-sm lg:gap-5 lg:text-base"
                >
                    <NavLink to="/map" aria-label="Mapeamento" className={navItemClass}>
                        <Map className="size-6 lg:size-5" />
                        <span className="hidden lg:inline">Mapeamento</span>
                    </NavLink>
                    <NavLink to="/events" aria-label="Eventos" className={navItemClass}>
                        <CalendarDays className="size-6 lg:size-5" />
                        <span className="hidden lg:inline">Eventos</span>
                    </NavLink>
                    <NavLink to="/actors" aria-label="Atores" className={navItemClass}>
                        <Users className="size-6 lg:size-5" />
                        <span className="hidden lg:inline">Atores</span>
                    </NavLink>
                </nav>

                {/* Logado: avatar com as iniciais leva ao perfil. Deslogado:
                    botão "Entrar" leva ao login. */}
                {isAuthenticated ? (
                    <Link to="/profile" aria-label="Perfil">
                        <Avatar size="sm" name={user?.name} />
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="text-primary hover:text-primary/80 text-sm font-bold transition"
                    >
                        Entrar
                    </Link>
                )}

                <Sheet>
                    <SheetTrigger aria-label="Abrir menu" className="cursor-pointer">
                        <Menu className="size-7" />
                    </SheetTrigger>
                    <MainMenu />
                </Sheet>
            </div>
        </header>
    )
}
