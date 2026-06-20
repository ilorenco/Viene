// Hook de logout: encerra a sessão e redireciona para a tela de login.

import { useNavigate } from 'react-router-dom'

import { logout } from '@/services/auth'

export function useLogout() {
    const navigate = useNavigate()
    return () => {
        logout()
        navigate('/login')
    }
}
