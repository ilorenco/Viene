import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { PasswordInput } from '../../components/ui/PasswordInput'

export function Register() {
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Digite o seu nome"
                />
                <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Digite o seu email"
                />
                <PasswordInput
                    name="password"
                    autoComplete="new-password"
                    placeholder="Digite a sua senha"
                />
                <PasswordInput
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Confirme a sua senha"
                />

                <Button type="submit">Finalizar</Button>
            </form>

            <p className="text-foreground text-center font-semibold">
                Já possui uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                    ENTRAR
                </Link>
            </p>
        </>
    )
}
