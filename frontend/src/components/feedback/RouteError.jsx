import { Link } from 'react-router-dom'

import errorIllustration from '@/assets/errors/something-went-wrong.png'
import { Button } from '@/components/ui/Button'

export function RouteError({ resetErrorBoundary }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <img src={errorIllustration} alt="" className="w-full max-w-67" />

            <h1 className="font-montserrat text-secondary text-2xl font-bold">Algo deu errado</h1>

            <p className="text-secondary max-w-xs text-sm">
                Não foi possível carregar este conteúdo. Tente novamente.
            </p>

            <div className="flex w-full max-w-xs flex-col gap-3">
                <Button onClick={resetErrorBoundary} className="text-background w-full" size="sm">
                    Tentar novamente
                </Button>

                <Button asChild className="text-background w-full" size="sm">
                    <Link to="/">Ir para o início</Link>
                </Button>
            </div>
        </div>
    )
}
