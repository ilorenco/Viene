import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { cn } from '@/lib/utils'
import { isStrongPassword, isValidEmail } from '@/lib/validation'
import { register } from '@/services/auth'

import { useAuthForm } from './AuthFormContext'

export function Register() {
    const navigate = useNavigate()
    const { values, setField } = useAuthForm()

    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const nextErrors = {}
        if (!values.name.trim()) nextErrors.name = 'Informe o seu nome.'
        if (!isValidEmail(values.email)) nextErrors.email = 'Informe um e-mail válido.'
        if (!isStrongPassword(values.password))
            nextErrors.password = 'A senha deve ter ao menos 8 caracteres, com letras e números.'
        if (values.confirmPassword !== values.password)
            nextErrors.confirmPassword = 'As senhas não coincidem.'
        if (!acceptedTerms) nextErrors.terms = 'Você precisa aceitar os Termos de Uso.'
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        try {
            setSubmitting(true)
            setServerError('')
            await register({
                name: values.name,
                email: values.email,
                password: values.password,
            })
            // Mantemos o e-mail preenchido (RN_008) e levamos o usuário ao Login.
            setField('password', '')
            setField('confirmPassword', '')
            navigate('/login')
        } catch (error) {
            // RN_001: ex. "Email já sendo utilizado" / "CPF já cadastrado" vêm do back-end.
            setServerError(error.message ?? 'Não foi possível criar a conta.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="animate-fade-in flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-secondary font-montserrat text-2xl font-extrabold">
                    Crie sua conta
                </h1>
                <p className="text-secondary/60 text-sm">
                    Junte-se à comunidade de inovação do Viene.
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <Input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Digite o seu nome"
                    value={values.name}
                    onChange={(event) => setField('name', event.target.value)}
                    className={cn('md:py-3', errors.name && 'border-danger')}
                />
                {errors.name && (
                    <p className="text-danger animate-fade-in pl-2 text-sm">{errors.name}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Digite o seu e-mail"
                    value={values.email}
                    onChange={(event) => setField('email', event.target.value)}
                    className={cn('md:py-3', errors.email && 'border-danger')}
                />
                {errors.email && (
                    <p className="text-danger animate-fade-in pl-2 text-sm">{errors.email}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <PasswordInput
                    name="password"
                    autoComplete="new-password"
                    placeholder="Digite a sua senha"
                    value={values.password}
                    onChange={(event) => setField('password', event.target.value)}
                    className={cn('md:py-3', errors.password && 'border-danger')}
                />
                {errors.password && (
                    <p className="text-danger animate-fade-in pl-2 text-sm">{errors.password}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <PasswordInput
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Confirme a sua senha"
                    value={values.confirmPassword}
                    onChange={(event) => setField('confirmPassword', event.target.value)}
                    className={cn('md:py-3', errors.confirmPassword && 'border-danger')}
                />
                {errors.confirmPassword && (
                    <p className="text-danger animate-fade-in pl-2 text-sm">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            <label className="flex items-center gap-2 pl-1 text-sm">
                <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="accent-primary size-5"
                />
                <span>
                    Li e concordo com os{' '}
                    {/* TODO: virar link quando a página de Termos de Uso for criada (páginas extras). */}
                    <span className="font-semibold underline">Termos de Uso</span>
                </span>
            </label>
            {errors.terms && (
                <p className="text-danger animate-fade-in pl-2 text-sm">{errors.terms}</p>
            )}

            {serverError && (
                <p className="text-danger animate-fade-in text-center text-sm font-semibold">
                    {serverError}
                </p>
            )}

            <Button
                type="submit"
                disabled={submitting}
                className="mt-2 flex items-center justify-center gap-2"
            >
                {submitting && <Loader2 className="size-5 animate-spin" />}
                {submitting ? 'Finalizando...' : 'Finalizar'}
            </Button>

            <p className="text-foreground text-center font-semibold">
                Já possui uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                    ENTRAR
                </Link>
            </p>
        </form>
    )
}
