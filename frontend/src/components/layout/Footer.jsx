// Rodapé do site (dentro do MainLayout). Organizado em colunas:
//   - Marca: logo (azul no modo noturno, branca no dia) + descrição;
//   - Navegação e Institucional: Sobre nós + Mapa do site (download);
//   - Jurídico e Segurança: Política/Termos (popup), selos de segurança (sem link);
//   - Suporte e Contatos: Ajuda/FAQ + redes sociais (levam ao 404 por enquanto).
// Embaixo, a faixa de direitos autorais (Copyright © ano).

import { ShieldCheck, Star } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import blueLogo from '@/assets/branding/logo-blue.png'
import whiteLogo from '@/assets/branding/logo-white.png'
import { Modal, ModalContent, ModalTitle } from '@/components/ui/Modal'
import { useAccessibility } from '@/features/accessibility/AccessibilityContext'

// Redes sociais: sem perfis reais ainda → levam à página 404 (rota inexistente).
// Os ícones de marca (Instagram/LinkedIn/YouTube) foram removidos do lucide-react
// (questão de marca registrada), então usamos os SVGs oficiais inline.
const socials = [
    {
        label: 'Instagram',
        path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
        label: 'LinkedIn',
        path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
    },
    {
        label: 'YouTube',
        path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
]

export function Footer() {
    const { settings } = useAccessibility()
    // O fundo do rodapé é escuro nos dois modos; a logo acompanha o tema: AZUL no
    // modo noturno (identidade da marca), BRANCA no modo dia.
    const logo = settings.nightMode ? blueLogo : whiteLogo
    const [legalOpen, setLegalOpen] = useState(false)
    const year = new Date().getFullYear()

    return (
        <footer className="bg-secondary text-background">
            <div className="px-6 py-8 lg:px-[10%]">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Marca */}
                    <div className="flex flex-col gap-3">
                        <img src={logo} alt="Viene" className="h-9 self-start" />
                        <p className="text-background/70 text-xs leading-relaxed">
                            Plataforma de mapeamento do ecossistema de inovação da região de
                            Joinville.
                        </p>
                    </div>

                    {/* Navegação e Institucional */}
                    <nav aria-label="Navegação e institucional" className="flex flex-col gap-2">
                        <h2 className="font-montserrat text-sm font-extrabold">
                            Navegação e Institucional
                        </h2>
                        <Link
                            to="/sobre"
                            className="text-background/70 hover:text-background w-fit text-xs transition"
                        >
                            Quem somos / Sobre nós
                        </Link>
                        {/* Sitemap: colocar o arquivo em `public/sitemap.pdf` para o download
                            funcionar (o Thiago vai enviar o arquivo depois). */}
                        <a
                            href="/sitemap.pdf"
                            download
                            className="text-background/70 hover:text-background w-fit text-xs transition"
                        >
                            Mapa do site (Sitemap)
                        </a>
                    </nav>

                    {/* Jurídico e Segurança */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-montserrat text-sm font-extrabold">
                            Jurídico e Segurança
                        </h2>
                        <button
                            type="button"
                            onClick={() => setLegalOpen(true)}
                            className="text-background/70 hover:text-background w-fit text-left text-xs transition"
                        >
                            Política de Privacidade e Termos de Uso
                        </button>
                        {/* Selos de segurança — sem conexão/link por enquanto (visual). */}
                        <div className="mt-1 flex flex-wrap gap-2">
                            <span className="bg-background/10 flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold">
                                <ShieldCheck className="size-3.5" /> SSL Seguro
                            </span>
                            <span className="bg-background/10 flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold">
                                <Star className="size-3.5" /> Reclame Aqui
                            </span>
                        </div>
                    </div>

                    {/* Suporte e Contatos */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-montserrat text-sm font-extrabold">
                            Suporte e Contatos
                        </h2>
                        <Link
                            to="/ajuda"
                            className="text-background/70 hover:text-background w-fit text-xs transition"
                        >
                            Central de Ajuda / FAQ
                        </Link>
                        <div className="mt-1 flex gap-3">
                            {socials.map(({ label, path }) => (
                                <Link
                                    key={label}
                                    to="/404"
                                    aria-label={label}
                                    className="bg-background/10 hover:bg-background/20 flex size-8 items-center justify-center rounded-full transition"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="size-4"
                                    >
                                        <path d={path} />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Direitos autorais */}
                <p className="border-background/15 text-background/60 mt-8 border-t pt-4 text-center text-xs">
                    Copyright © {year} Viene. Todos os direitos reservados.
                </p>
            </div>

            {/* Política de Privacidade e Termos de Uso (popup placeholder; pode virar
                uma página própria depois). */}
            <Modal open={legalOpen} onOpenChange={setLegalOpen}>
                <ModalContent aria-describedby={undefined} className="viene-scrollbar">
                    <ModalTitle>Política de Privacidade e Termos de Uso</ModalTitle>
                    <div className="text-secondary/80 flex flex-col gap-3 text-sm leading-relaxed">
                        <p>
                            Esta é uma versão preliminar. O texto definitivo da Política de
                            Privacidade e dos Termos de Uso será disponibilizado em breve.
                        </p>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-secondary font-montserrat font-bold">
                                1. Privacidade
                            </h3>
                            <p>
                                A Viene coleta apenas os dados necessários para o funcionamento da
                                plataforma de mapeamento (cadastro de atores e eventos) e não
                                compartilha informações pessoais com terceiros sem consentimento.
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-secondary font-montserrat font-bold">
                                2. Termos de Uso
                            </h3>
                            <p>
                                Ao usar a Viene, você concorda em fornecer informações verdadeiras e
                                em utilizar a plataforma de forma respeitosa. Conteúdos enviados
                                (atores e eventos) passam por moderação antes de serem publicados.
                            </p>
                        </div>
                        <p className="text-secondary/50 text-xs">
                            Última atualização: {year}. Em caso de dúvidas, fale com a equipe pela
                            Central de Ajuda.
                        </p>
                    </div>
                </ModalContent>
            </Modal>
        </footer>
    )
}
