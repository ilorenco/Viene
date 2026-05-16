import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'

export function Login() {
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Digite o seu email"
                />
                <PasswordInput
                    name="password"
                    autoComplete="current-password"
                    placeholder="Digite a sua senha"
                />

                <Button type="submit">Confirmar</Button>
            </form>

            <Link
                to="/register"
                className="text-foreground text-center font-semibold hover:underline"
            >
                CRIAR CONTA
            </Link>
        </>
    )
}
