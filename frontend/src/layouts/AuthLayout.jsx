// Layout das telas de autenticação (Login/Cadastro).
//   - DESKTOP (md+): tela cheia em DOIS painéis. Login = form à esquerda, imagem à
//     direita; Cadastro = a imagem desliza p/ a esquerda e o form p/ a direita.
//   - MOBILE: coluna única — faixa de IMAGEM no topo (efeito antigo) + formulário
//     embaixo, com os cantos superiores arredondados sobre a imagem.
//
// A ANIMAÇÃO do desktop funciona porque este layout fica MONTADO ao trocar entre
// /login e /register (só o <Outlet/> troca) → os painéis persistem e o CSS anima a
// mudança de `transform`, mantendo a troca de rota (sem acoplar as telas).

import { ArrowLeft } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import background from '@/assets/auth/background.png'
import blackLogo from '@/assets/branding/logo-black.png'
import blueLogo from '@/assets/branding/logo-blue.png'
import { useAccessibility } from '@/features/accessibility/AccessibilityContext'
import { cn } from '@/lib/utils'
import { AuthFormProvider } from '@/pages/auth/AuthFormContext'

export function AuthLayout() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const isRegister = pathname.startsWith('/register')

    const { settings } = useAccessibility()
    const logo = settings.nightMode ? blueLogo : blackLogo

    // Transição usada nos dois painéis do desktop (respeita "reduzir movimento").
    const slide = 'transition-transform duration-500 ease-in-out motion-reduce:transition-none'

    return (
        <div className="bg-background flex min-h-screen flex-col overflow-hidden md:flex-row">
            {/* MOBILE: faixa de imagem no topo (efeito antigo) — some no desktop. */}
            <div className="bg-primary relative h-40 shrink-0 overflow-hidden md:hidden">
                <img
                    src={background}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <button
                    type="button"
                    aria-label="Voltar"
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-5 text-white transition active:scale-90"
                >
                    <ArrowLeft className="size-6" />
                </button>
            </div>

            {/* Formulário. Mobile: sobe sobre a imagem (cantos arredondados). Desktop:
                metade da tela e desliza para a DIREITA no Cadastro. */}
            <main
                className={cn(
                    'bg-background relative z-10 -mt-6 w-full overflow-y-auto rounded-t-3xl md:z-0 md:mt-0 md:w-1/2 md:rounded-none',
                    slide,
                    isRegister && 'md:translate-x-full',
                )}
            >
                <button
                    type="button"
                    aria-label="Voltar"
                    onClick={() => navigate(-1)}
                    className="text-secondary/60 hover:text-secondary absolute top-5 left-5 z-10 hidden cursor-pointer transition active:scale-90 md:block"
                >
                    <ArrowLeft className="size-6" />
                </button>

                {/* Wrapper que centraliza e permite rolar sem cortar o topo. */}
                <div className="flex min-h-full items-center justify-center p-8 lg:p-12">
                    <div className="flex w-full max-w-md flex-col gap-6">
                        <Link
                            to="/"
                            aria-label="Ir para a página inicial"
                            className="self-center md:self-start"
                        >
                            <img src={logo} alt="Viene" className="h-10" />
                        </Link>
                        <AuthFormProvider>
                            <Outlet />
                        </AuthFormProvider>
                    </div>
                </div>
            </main>

            {/* DESKTOP: imagem + frase. Desliza para a ESQUERDA no Cadastro. z-10 para
                passar por cima do formulário durante o cruzamento. */}
            <aside
                className={cn(
                    'bg-primary relative z-10 hidden w-1/2 shrink-0 flex-col items-center justify-center overflow-hidden p-10 md:flex',
                    slide,
                    isRegister && 'md:-translate-x-full',
                )}
            >
                <img
                    src={background}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <div className="relative flex flex-col items-center text-center">
                    <h2 className="font-montserrat text-3xl font-extrabold text-white lg:text-4xl">
                        Venha Inovar!
                    </h2>
                    <p className="mt-3 max-w-xs text-sm text-white/85 lg:text-base">
                        Conecte-se ao ecossistema de inovação da região de Joinville e faça parte da
                        comunidade.
                    </p>
                </div>
            </aside>
        </div>
    )
}
