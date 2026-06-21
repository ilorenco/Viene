// Guardas de rota (RBAC).
//
// <ProtectedRoute>: exige usuário logado. Sem login, manda para o /login e guarda
// a rota de origem em `state.from` — assim, depois de entrar, o Login devolve o
// usuário para onde ele queria ir.
//
// <AdminRoute>: exige papel de administrador. Sem login → /login; logado mas sem
// ser admin → volta para a Home (não revela a área restrita).
//
// Uso: como rota "pai" no AppRoutes, envolvendo as rotas filhas via <Outlet/>.

import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />
}

export function AdminRoute() {
    const { isAuthenticated, isAdmin } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }
    if (!isAdmin) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
