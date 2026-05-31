import { Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import blackLogo from '@/assets/branding/logo-black.png'
import { MainMenu } from '@/components/layout/MainMenu'
import { Avatar } from '@/components/ui/Avatar'
import { Sheet, SheetTrigger } from '@/components/ui/Sheet'

export function Header() {
    return (
        <header className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <img src={blackLogo} alt="Viene" />
                </Link>

                <div className="flex items-center gap-2">
                    <Link to="/profile" aria-label="Perfil">
                        <Avatar size="sm" />
                    </Link>

                    <Sheet>
                        <SheetTrigger aria-label="Abrir menu" className="cursor-pointer">
                            <Menu className="size-8" />
                        </SheetTrigger>
                        <MainMenu />
                    </Sheet>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Barra de pesquisa desse jeito por enquanto apenas para esboço, analisar depois se o ideal vai ser criar um componente a parte ou deixar imbutido no header */}
                <input type="search" className="flex-1 rounded-full border-2 outline-none" />

                <Search className="text-primary size-8" />
            </div>
        </header>
    )
}
