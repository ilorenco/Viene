import { Heart, MapPin, Search, Ticket } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { MainMenuItem } from '@/components/layout/MainMenuItem'
import { Avatar } from '@/components/ui/Avatar'
import { SheetClose, SheetContent, SheetTitle } from '@/components/ui/Sheet'

const sections = [
    {
        title: 'EXPLORAR',
        items: [
            { to: '/actors', label: 'Encontre empresas', icon: Search },
            { to: '/map', label: 'Mapeamento', icon: MapPin },
        ],
    },
    {
        title: 'MINHA CONTA',
        items: [
            { to: '/tickets', label: 'Meus ingressos', icon: Ticket },
            { to: '/favorites', label: 'Meus favoritos', icon: Heart },
        ],
    },
]

export function MainMenu() {
    return (
        <SheetContent className="gap-8">
            <SheetTitle className="sr-only">Menu</SheetTitle>

            <SheetClose asChild>
                <Link to="/profile" className="flex items-center gap-3 text-left">
                    <Avatar size="md" />
                    <div className="flex flex-col">
                        <p className="text-foreground font-bold">Olá, João! 👋</p>
                        <p className="text-secondary text-sm">
                            Explore parques e experiências incríveis
                        </p>
                    </div>
                </Link>
            </SheetClose>

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
            </nav>
        </SheetContent>
    )
}
