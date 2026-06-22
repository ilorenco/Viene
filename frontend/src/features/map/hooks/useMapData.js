// Hook de busca dos dados do Mapa no padrão da branch do colega (React Query +
// Suspense): o loading sobe via <Suspense> e o erro via <ErrorBoundary>, então
// este hook devolve atores e eventos já resolvidos (sem checar loading/erro na
// tela).
//
// Usa useSuspenseQueries para buscar as DUAS listas EM PARALELO. Se usássemos dois
// useSuspenseQuery soltos no mesmo componente, ele suspenderia no primeiro e o
// segundo só começaria depois que o primeiro terminasse (efeito "cascata", mais
// lento). O useSuspenseQueries dispara as duas de uma vez e só libera a tela quando
// ambas chegam.
//
// Mantemos os services locais (listInnovationUnits/listMapEvents de
// src/services/map.js) como ponto único de acesso aos dados de Atores/Eventos
// pro Mapa.

import { useSuspenseQueries } from '@tanstack/react-query'

import { listInnovationUnits, listMapEvents } from '@/features/map/services/map'

export function useMapData() {
    const [actors, events] = useSuspenseQueries({
        queries: [
            { queryKey: ['map', 'actors'], queryFn: listInnovationUnits },
            { queryKey: ['map', 'events'], queryFn: listMapEvents },
        ],
    })

    return { actors: actors.data, events: events.data }
}
