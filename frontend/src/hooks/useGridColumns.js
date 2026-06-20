// Devolve quantas COLUNAS o grid de cards está mostrando no momento, conforme a
// largura da tela. Os pontos de corte seguem o grid usado em ActorList/EventList:
//   grid-cols-1  sm:grid-cols-2  lg:grid-cols-3  2xl:grid-cols-4
// (breakpoints do Tailwind: sm=640px, lg=1024px, 2xl=1536px).
//
// Útil para paginar por "número de linhas": pageSize = colunas * linhasPorPagina.

import { useEffect, useState } from 'react'

function columnsForWidth(width) {
    if (width >= 1536) return 4
    if (width >= 1024) return 3
    if (width >= 640) return 2
    return 1
}

export function useGridColumns() {
    const [columns, setColumns] = useState(() => columnsForWidth(window.innerWidth))

    useEffect(() => {
        function onResize() {
            setColumns(columnsForWidth(window.innerWidth))
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    return columns
}
