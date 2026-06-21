// Hook utilitário para "ações que exigem login" (favoritar, denunciar, etc.).
//
// requireAuth(acao): se houver usuário logado, executa a ação; caso contrário,
// leva ao /login guardando a rota atual em `state.from` (para voltar depois de
// entrar). Retorna true/false indicando se a ação chegou a rodar.

import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthContext'

export function useRequireAuth() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const requireAuth = useCallback(
        (action) => {
            if (isAuthenticated) {
                action?.()
                return true
            }
            navigate('/login', { state: { from: location } })
            return false
        },
        [isAuthenticated, navigate, location],
    )

    return { isAuthenticated, requireAuth }
}
