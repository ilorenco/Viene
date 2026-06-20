// Lista de contatos/redes do ator (chips: ícone + nome), usada na tela de
// Especificações do Ator. Componente de APRESENTAÇÃO: recebe os campos prontos por
// props e só monta os chips dos contatos preenchidos (campos nulos são ignorados).
// A montagem ficava dentro da página — trazê-la pra cá deixa a página só orquestrando.

import { ExternalLink, Globe, Mail, Phone } from 'lucide-react'

export function ActorContactList({ website, phone, email, linkedin, instagram, youtube }) {
    const contacts = [
        website && {
            icon: Globe,
            label: 'Website',
            href: website.startsWith('http') ? website : `https://${website}`,
            external: true,
        },
        phone && { icon: Phone, label: 'Telefone', href: `tel:${phone.replace(/\D/g, '')}` },
        email && { icon: Mail, label: 'E-mail', href: `mailto:${email}` },
        linkedin && { icon: ExternalLink, label: 'LinkedIn', href: linkedin, external: true },
        instagram && { icon: ExternalLink, label: 'Instagram', href: instagram, external: true },
        youtube && { icon: ExternalLink, label: 'YouTube', href: youtube, external: true },
    ].filter(Boolean)

    if (contacts.length === 0) return null

    return (
        <div className="border-secondary/10 flex flex-col gap-2 border-t pt-4">
            <h2 className="font-montserrat text-secondary text-sm font-extrabold">
                Contato e redes
            </h2>
            <ul className="flex flex-wrap gap-2">
                {contacts.map((contact) => (
                    <li key={contact.label}>
                        <a
                            href={contact.href}
                            {...(contact.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                            className="border-secondary/15 text-secondary hover:border-primary hover:text-primary flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition active:scale-95"
                        >
                            <contact.icon className="text-primary size-4 shrink-0" />
                            {contact.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
