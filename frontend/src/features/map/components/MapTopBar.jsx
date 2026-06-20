// Cabeçalho do mapa: logo no canto esquerdo; links de navegação (Mapeamento/
// Eventos/Atores) + perfil + menu agrupados à direita. Fica SEMPRE visível, para
// o usuário sempre saber onde está e como navegar (antes só aparecia quando o
// mouse chegava ao topo da tela).

import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

import blackLogo from '@/assets/branding/logo-black.png'
import { MainMenu } from '@/components/layout/MainMenu'
import { Avatar } from '@/components/ui/Avatar'
import { Sheet, SheetTrigger } from '@/components/ui/Sheet'

export function MapTopBar() {
    return (
        <div className="bg-background/95 absolute inset-x-0 top-0 z-[1000] flex items-center gap-2 px-4 py-2 shadow-md backdrop-blur">
            <Link to="/" className="shrink-0">
                <img src={blackLogo} alt="Viene" className="h-7" />
            </Link>

            <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
                <nav
                    aria-label="Navegação principal"
                    className="text-secondary flex items-center gap-3 text-xs font-semibold sm:gap-5 sm:text-sm"
                >
                    <Link to="/map">Mapeamento</Link>
                    <Link to="/events">Eventos</Link>
                    <Link to="/actors">Atores</Link>
                </nav>

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
    )
}
