import { Link } from 'react-router-dom'

import notFoundIllustration from '@/assets/errors/not-found.png'

export function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <h1 className="flex flex-col items-center">
                <span
                    aria-hidden="true"
                    className="text-primary text-8xl leading-none font-extrabold"
                >
                    404
                </span>
                <span className="font-montserrat text-secondary text-2xl font-bold">
                    Página não encontrada
                </span>
            </h1>

            <p className="text-secondary max-w-xs text-sm">
                Ops! A página que você está procurando não existe ou foi movida.
            </p>

            <img src={notFoundIllustration} alt="" className="my-2 w-full max-w-64" />

            <p className="text-secondary max-w-xs text-sm">
                Que tal voltar para o início e continuar explorando?
            </p>

            <Link
                to="/"
                className="bg-primary text-background rounded-full px-4 py-2 text-base font-bold"
            >
                Ir para o início
            </Link>
        </div>
    )
}
