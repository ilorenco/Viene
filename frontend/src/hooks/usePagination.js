// Hook simples de paginação no cliente: recebe a lista completa e devolve apenas
// os itens da página atual, junto do controle de página.
//
// Opções:
//   - pageSize: itens por página (padrão 6).
//   - resetKey: quando muda (ex.: troca de categoria, aba ou busca), volta para a
//     primeira página.
//
// Obs.: hoje os dados vêm de mocks e a paginação é feita no cliente. Quando a API
// real existir, basta o serviço passar a aceitar página/limite e este hook pode
// ser trocado por uma versão que pede a página ao back-end — as telas não mudam.

import { useState } from 'react'

export function usePagination(items, { pageSize = 6, resetKey } = {}) {
    const [page, setPage] = useState(1)
    const [prevKey, setPrevKey] = useState(resetKey)

    // Padrão do React de "ajustar estado durante o render": ao mudar o filtro,
    // volta para a página 1 sem renderizar um estado intermediário visível.
    if (resetKey !== prevKey) {
        setPrevKey(resetKey)
        setPage(1)
    }

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
    // Mantém a página dentro do intervalo válido (a lista pode ter encolhido).
    const safePage = Math.min(page, totalPages)
    const start = (safePage - 1) * pageSize
    const pageItems = items.slice(start, start + pageSize)

    // Ao trocar de página pelos controles de paginação, sobe a tela para o topo do
    // catálogo — assim a nova página é vista desde o início (a navbar é sticky, então
    // o começo do conteúdo fica logo abaixo dela). A troca de filtro/aba reseta para
    // a página 1 pelo setPage interno (acima), sem rolar — ali o usuário já está no topo.
    function goToPage(next) {
        setPage(next)
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return { page: safePage, setPage: goToPage, totalPages, pageItems }
}
