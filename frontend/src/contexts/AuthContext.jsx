// Contexto global de Autenticação.
//
// Guarda, de forma REATIVA, o usuário logado (ou null) para que a interface
// reaja na hora ao entrar/sair (ex.: o menu mostra/esconde a área de admin sem
// precisar recarregar a página). Delega as operações ao serviço (services/auth),
// que é a camada que falará com a API REST quando o back-end estiver conectado.
//
// Papéis (RBAC): o usuário tem um `role` ('admin' | 'usuario'). Só admin acessa a
// área de administração. No modo mock, o papel é definido no login (ver auth.js).

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import {
    getCurrentUser,
    login as loginService,
    logout as logoutService,
    register as registerService,
} from '@/services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    // Estado inicial: lê o usuário já salvo no navegador (sessão persistida).
    const [user, setUser] = useState(getCurrentUser)

    const login = useCallback(async (credentials) => {
        const data = await loginService(credentials)
        // Atualiza o estado reativo a partir do que o serviço persistiu.
        setUser(data.user ?? getCurrentUser())
        return data
    }, [])

    const register = useCallback((payload) => registerService(payload), [])

    const logout = useCallback(() => {
        logoutService()
        setUser(null)
    }, [])

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            isAdmin: user?.role === 'admin',
            login,
            register,
            logout,
        }),
        [user, login, register, logout],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook + Provider no mesmo arquivo (padrão de Context)
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
    }
    return context
}
