// Contexto compartilhado dos tipos de evento selecionados.
//
// É usado pela tela de Eventos (chips de tipos) e pela página do Mapa (filtro de
// eventos), para que a seleção feita em uma reflita na outra.

import { createContext, useContext, useState } from 'react'

import { mockEventCategories } from '@/features/events/mocks/eventCategories'

const EventFiltersContext = createContext(null)

const ALL_CATEGORIES = mockEventCategories.map((category) => category.value)

export function EventFiltersProvider({ children }) {
    // Começa com todos os tipos selecionados (mostra todos os eventos).
    const [selectedEventCategories, setSelectedEventCategories] = useState(
        () => new Set(ALL_CATEGORIES),
    )

    return (
        <EventFiltersContext.Provider
            value={{ selectedEventCategories, setSelectedEventCategories }}
        >
            {children}
        </EventFiltersContext.Provider>
    )
}

export function useEventFilters() {
    const context = useContext(EventFiltersContext)
    if (!context) {
        throw new Error('useEventFilters deve ser usado dentro de <EventFiltersProvider>')
    }
    return context
}
