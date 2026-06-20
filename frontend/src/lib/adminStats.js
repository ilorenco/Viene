// Estatísticas dos atores para o Painel do admin (gráficos + tabela). Funções
// PURAS: recebem a lista de atores (já carregada via hook na tela) e devolvem os
// dados derivados — sem buscar nada e sem importar mock. Mantém a regra fora do
// componente AdminPanel.

import { ATOR_AREAS } from '@/lib/atorTypes'

const SHORT_AREA = {
    ambientes: 'Ambientes',
    privado: 'Privado',
    educacao: 'Educação',
    publico: 'Público',
}

// Estatísticas por área (atores, tags distintas e tag mais comum).
export function getAreaStats(actors) {
    return ATOR_AREAS.map((area) => {
        const inArea = actors.filter((actor) => actor.category === area.id)
        const tagCounts = new Map()
        for (const actor of inArea) {
            if (actor.tags) tagCounts.set(actor.tags, (tagCounts.get(actor.tags) ?? 0) + 1)
        }
        const topTag = [...tagCounts.entries()].sort((a, b) => b[1] - a[1])[0]
        return {
            id: area.id,
            label: area.label,
            short: SHORT_AREA[area.id] ?? area.label,
            color: area.color,
            count: inArea.length,
            distinctTags: tagCounts.size,
            topTag: topTag ? topTag[0] : '—',
        }
    })
}

// Atores por ano de fundação (para o gráfico de linha), ordenados por ano.
export function getFoundedCounts(actors) {
    const map = new Map()
    for (const actor of actors) {
        const year = Number(actor.founded)
        if (Number.isFinite(year)) map.set(year, (map.get(year) ?? 0) + 1)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([year, count]) => ({ year, count }))
}
