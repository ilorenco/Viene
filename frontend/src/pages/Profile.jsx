import {
    CalendarCheck,
    CalendarDays,
    CalendarRange,
    ChevronRight,
    Heart,
    History,
    Pencil,
    SquarePlus,
    Store,
    Ticket,
    TreePine,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

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

function ProfileSection({
    icon: Icon,
    title,
    seeAllTo,
    containerClassName = 'grid grid-cols-2 divide-x',
    children,
}) {
    return (
        <section>
            <header className="mb-3 flex items-center justify-between">
                <div className="text-primary flex items-center gap-2">
                    <Icon className="size-5" />
                    <h2 className="text-foreground font-inter text-lg font-bold">{title}</h2>
                </div>
                {seeAllTo && (
                    <Link
                        to={seeAllTo}
                        className="text-primary flex items-center gap-0.5 text-sm font-medium"
                    >
                        Ver todos <ChevronRight className="size-4" />
                    </Link>
                )}
            </header>
            <ul
                className={cn(
                    'divide-foreground/10 bg-white rounded-lg text-sm shadow-sm',
                    containerClassName,
                )}
            >
                {children}
            </ul>
        </section>
    )
}

function CollectionItem({ icon: Icon, title, description, to, meta }) {
    return (
        <li>
            <Link to={to} className="flex items-center gap-3 p-4">
                <div className="bg-primary/10 text-primary shrink-0 rounded-full p-3">
                    <Icon className="size-6" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="text-foreground font-bold">{title}</p>
                    <p className="text-foreground/50 text-xs leading-tight">{description}</p>
                </div>
                {meta && <span className="text-foreground/50 shrink-0 text-xs">{meta}</span>}
                <ChevronRight className="text-foreground/70 size-5 shrink-0" />
            </Link>
        </li>
    )
}

export function Profile() {
    return (
        <>
            <header className="bg-secondary rounded-lg p-5">
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <div className="bg-primary size-20 rounded-full" />
                        <button
                            type="button"
                            aria-label="Editar foto de perfil"
                            className="bg-secondary border-background/20 text-background absolute right-0 bottom-0 rounded-full border p-1.5"
                        >
                            <Pencil className="size-3" />
                        </button>
                    </div>

                    <div className="text-background flex flex-col gap-0.5">
                        <h1 className="font-inter text-lg leading-tight font-bold">João Silva</h1>
                        <p className="text-background/60 text-sm">Membro desde 2024</p>
                    </div>
                </div>

                <ul className="divide-background/20 mt-4 flex divide-x">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <li key={label} className="flex flex-1 flex-col items-center gap-1 px-3">
                            <div className="text-primary flex items-center gap-1.5">
                                <Icon className="size-5" />
                                <span className="text-background font-bold">{value}</span>
                            </div>
                            <span className="text-background/60 text-center text-xs">{label}</span>
                        </li>
                    ))}
                </ul>
            </header>

            <ProfileSection icon={CalendarRange} title="Meus eventos" seeAllTo="/events">
                {eventActions.map((item) => (
                    <CollectionItem key={item.title} {...item} />
                ))}
            </ProfileSection>

            <ProfileSection icon={Heart} title="Meus favoritos" seeAllTo="/favorites">
                {favoriteCollections.map((item) => (
                    <CollectionItem key={item.title} {...item} />
                ))}
            </ProfileSection>

            <ProfileSection
                icon={History}
                title="Histórico de eventos"
                seeAllTo="/tickets"
                containerClassName="flex flex-col divide-y"
            >
                {eventHistory.map((item) => (
                    <CollectionItem key={item.title} {...item} />
                ))}
            </ProfileSection>

            <Button variant="danger" className="self-center" size="sm">
                Sair da conta
            </Button>
        </>
    )
}
