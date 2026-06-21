// Hook de logout: encerra a sessão e volta para a Home com um recarregamento.
//
// Usamos `window.location.assign('/')` (navegação "dura") de propósito: se apenas
// limpássemos a sessão dentro de uma página protegida, o ProtectedRoute
// redirecionaria para /login no meio do caminho (corrida com o guard). Recarregar
// na Home garante o destino certo e ainda zera qualquer dado em memória do usuário
// anterior (cache do React Query, estados locais) — comportamento desejado ao sair.

import { useAuth } from '@/contexts/AuthContext'

export function useLogout() {
    const { logout } = useAuth()
    return () => {
        logout() // limpa token + usuário (localStorage) e o estado reativo
        window.location.assign('/') // recarrega na Home: destino garantido, estado limpo
    }
}
