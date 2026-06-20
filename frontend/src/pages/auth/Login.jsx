import { Loader2, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { cn } from '@/lib/utils'
import { isValidEmail } from '@/lib/validation'
import { login, recoverPassword } from '@/services/auth'

import { useAuthForm } from './AuthFormContext'

export function Login() {
    const navigate = useNavigate()
    const { values, setField, reset } = useAuthForm()

    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [info, setInfo] = useState('')
    const [submitting, setSubmitting] = useState(false)
    // "Lembrar de mim": por enquanto só visual (sem persistência real ainda).
    const [remember, setRemember] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const nextErrors = {}
        if (!isValidEmail(values.email)) nextErrors.email = 'Informe um e-mail válido.'
        if (!values.password) nextErrors.password = 'Informe a sua senha.'
        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        try {
            setSubmitting(true)
            setServerError('')
            setInfo('')
            await login({ email: values.email, password: values.password })
            reset()
            navigate('/')
        } catch (error) {
            // RN_006: as mensagens de credenciais ("Senha incorreta", etc) vêm do back-end.
            setServerError(error.message ?? 'Não foi possível entrar.')
        } finally {
            setSubmitting(false)
        }
    }

    async function handleRecover() {
        setServerError('')
        setInfo('')
        if (!isValidEmail(values.email)) {
            setErrors({ email: 'Digite o seu e-mail para recuperar a senha.' })
            return
        }
        setErrors({})
        try {
            const { message } = await recoverPassword({ email: values.email })
            setInfo(message)
        } catch (error) {
            setServerError(error.message ?? 'Não foi possível enviar a recuperação.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="animate-fade-in flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-secondary font-montserrat text-2xl font-extrabold">
                    Olá! Bem-vindo de volta
                </h1>
                <p className="text-secondary/60 text-sm">
                    Entre para continuar explorando o ecossistema.
                </p>
            </div>

            <label
                htmlFor="login-email"
                className="text-secondary flex flex-col gap-1.5 text-sm font-semibold"
            >
                E-mail
                <div className="relative">
                    <Mail
                        aria-hidden="true"
                        className="text-secondary/40 pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2"
                    />
                    <Input
                        id="login-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Digite o seu e-mail"
                        value={values.email}
                        onChange={(event) => setField('email', event.target.value)}
                        className={cn('pl-14 md:py-3', errors.email && 'border-danger')}
                    />
                </div>
                {errors.email && (
                    <p className="text-danger animate-fade-in pl-2 text-sm font-normal">
                        {errors.email}
                    </p>
                )}
            </label>

            <label
                htmlFor="login-password"
                className="text-secondary flex flex-col gap-1.5 text-sm font-semibold"
            >
                Senha
                <div className="relative">
                    <Lock
                        aria-hidden="true"
                        className="text-secondary/40 pointer-events-none absolute top-1/2 left-5 z-10 size-5 -translate-y-1/2"
                    />
                    <PasswordInput
                        id="login-password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Digite a sua senha"
                        value={values.password}
                        onChange={(event) => setField('password', event.target.value)}
                        className={cn('pl-14 md:py-3', errors.password && 'border-danger')}
                    />
                </div>
                {errors.password && (
                    <p className="text-danger animate-fade-in pl-2 text-sm font-normal">
                        {errors.password}
                    </p>
                )}
            </label>

            <div className="flex items-center justify-between gap-2">
                <label className="text-secondary flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                        className="accent-primary size-4"
                    />
                    Lembrar de mim
                </label>
                <button
                    type="button"
                    onClick={handleRecover}
                    className="text-primary text-sm font-semibold hover:underline"
                >
                    Esqueci a senha
                </button>
            </div>

            {serverError && (
                <p className="text-danger animate-fade-in text-center text-sm font-semibold">
                    {serverError}
                </p>
            )}
            {info && (
                <p className="animate-fade-in text-center text-sm font-semibold text-green-600">
                    {info}
                </p>
            )}

            <Button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2"
            >
                {submitting && <Loader2 className="size-5 animate-spin" />}
                {submitting ? 'Entrando...' : 'Entrar'}
            </Button>

            <p className="text-secondary text-center text-sm">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                    Criar conta
                </Link>
            </p>
        </form>
    )
}
