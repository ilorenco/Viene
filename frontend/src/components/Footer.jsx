import { Link } from 'react-router-dom'

import logo from '../assets/branding/logo.png'

const siteLinks = [
    { to: '/', label: 'Principal' },
    { to: '/mapa', label: 'Mapa' },
    { to: '/ingressos', label: 'Meus ingressos' },
]

export function Footer() {
    return (
        <footer className="bg-secondary text-background flex items-center justify-between gap-6 px-6 py-5">
            <div>
                <img src={logo} />
                <p className="mt-2 text-xs font-light">Uma plataforma de mapeamento</p>
            </div>
            <nav>
                <h2 className="font-inter mb-1 text-right text-xs font-semibold">
                    Navegue pelo site
                </h2>
                <ul className="flex flex-col gap-0.5 border-r pr-2 text-right text-xs font-light">
                    {siteLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to} className="hover:underline">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    )
}
