// Sobe a tela para o TOPO sempre que a rota (pathname) muda. Sem isto, o
// react-router preserva a posição de scroll — então, ao abrir um detalhe
// (ator/evento) a partir do fim de uma lista, a página já abria "rolada para
// baixo". Salto instantâneo (é uma troca de página). Não renderiza nada.

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
