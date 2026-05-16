import { Menu, Search, UserRound } from 'lucide-react'

import blackLogo from '@/assets/branding/logo-black.png'

export function Header() {
    return (
        <header className="flex flex-col gap-3 p-3">
            <div className="flex items-center justify-between">
                <img src={blackLogo} />

                <div className="flex items-center gap-2">
                    <UserRound size={35} />
                    <Menu size={35} />
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Barra de pesquisa desse jeito por enquanto apenas para esboço, analisar depois se o ideal vai ser criar um componente a parte ou deixar imbutido no header */}
                <input type="search" className="flex-1 rounded-full border-2 outline-none" />

                <Search size={35} className="text-primary" />
            </div>
        </header>
    )
}
