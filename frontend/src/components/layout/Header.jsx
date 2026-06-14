import { CalendarDays, Map, Menu, Users } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import blackLogo from '@/assets/branding/logo-black.png'
import { MainMenu } from '@/components/layout/MainMenu'
import { Avatar } from '@/components/ui/Avatar'
import { Sheet, SheetTrigger } from '@/components/ui/Sheet'
import { cn } from '@/lib/utils'

const navLinkClass = ({ isActive }) => cn('flex items-center gap-2', isActive && 'text-primary')

export function Header() {
    return (
        <header className="bg-background border-secondary/10 sticky top-0 z-40 flex items-center justify-between gap-2 border-b p-4">
            <Link to="/" className="shrink-0">
                <img src={blackLogo} alt="Viene" className="h-8" />
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
                <nav
                    aria-label="Navegação principal"
                    className="text-secondary flex items-center gap-4 text-xs font-semibold sm:text-sm lg:gap-5"
                >
                    <NavLink to="/map" aria-label="Mapeamento" className={navLinkClass}>
                        <Map className="size-6 lg:size-5" />
                        <span className="hidden lg:inline">Mapeamento</span>
                    </NavLink>
                    <NavLink to="/events" aria-label="Eventos" className={navLinkClass}>
                        <CalendarDays className="size-6 lg:size-5" />
                        <span className="hidden lg:inline">Eventos</span>
                    </NavLink>
                    <NavLink to="/actors" aria-label="Atores" className={navLinkClass}>
                        <Users className="size-6 lg:size-5" />
                        <span className="hidden lg:inline">Atores</span>
                    </NavLink>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/profile" aria-label="Perfil">
                        <Avatar size="sm" />
                    </Link>

                    <Sheet>
                        <SheetTrigger aria-label="Abrir menu" className="cursor-pointer">
                            <Menu className="size-7" />
                        </SheetTrigger>
                        <MainMenu />
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
