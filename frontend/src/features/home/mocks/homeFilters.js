import { mockActors } from '@/features/actors/mocks/actors'

// Opções de filtro da seção "Explore!" da Home.
export const mockSortOptions = [
    { value: 'recentes', label: 'Mais recentes' },
    { value: 'antigos', label: 'Mais antigos' },
]

// Cidades disponíveis (derivadas dos atores reais da planilha).
const cities = [...new Set(mockActors.map((actor) => actor.city).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
)

export const mockCityOptions = [
    { value: 'todas', label: 'Todas as cidades' },
    ...cities.map((city) => ({ value: city, label: city })),
]

// (Opções do layout antigo da Home — mantidas, hoje sem uso direto.)
export const mockPlaceOptions = [
    { value: 'all', label: 'Todos os lugares' },
    { value: 'nearby', label: 'Perto de mim' },
]

export const mockFilterOptions = [
    { value: 'recent', label: 'Mais recentes' },
    { value: 'popular', label: 'Mais populares' },
]
