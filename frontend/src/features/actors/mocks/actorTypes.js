// Tipos de atores agrupados por área, conforme a "Legenda Atores" da Região de
// Joinville. As cores acompanham o código de cores do documento e são usadas
// para colorir os pinos do mapa e os filtros.

export const ACTOR_AREAS = [
    {
        id: 'ambientes',
        label: 'Ambientes de Inovação e Facilitadores',
        color: '#e8b84b',
        types: [
            { id: 'hub', label: 'Hub de Inovação' },
            { id: 'incubadora', label: 'Incubadora / Aceleradora' },
            { id: 'coworking', label: 'Espaço de Coworking' },
            { id: 'parque', label: 'Parque Tecnológico' },
            { id: 'maker', label: 'Espaço Maker / FabLab' },
        ],
    },
    {
        id: 'privado',
        label: 'Setor Privado e Negócios',
        color: '#6f9fe0',
        types: [
            { id: 'startup', label: 'Startup' },
            { id: 'spinoff', label: 'Startup — Spin-off' },
            { id: 'corporacao', label: 'Empresa Consolidada / Corporação' },
            { id: 'softwarehouse', label: 'Serviços Tecnológicos (Software House)' },
            { id: 'mpe', label: 'MPE (Micro e Pequena Empresa)' },
        ],
    },
    {
        id: 'educacao',
        label: 'Educação, Ciência e Pesquisa',
        color: '#86c98a',
        types: [
            { id: 'ies', label: 'Instituição de Ensino Superior (IES)' },
            { id: 'tecnico', label: 'Ensino Técnico / Profissionalizante' },
            { id: 'pd', label: 'P&D (Centro de Pesquisa)' },
        ],
    },
    {
        id: 'publico',
        label: 'Setor Público e Institucional',
        color: '#e07a72',
        types: [
            { id: 'governo', label: 'Órgão Governamental' },
            { id: 'associacao', label: 'Associação / Entidade de Classe' },
            { id: 'fomento', label: 'Agência de Fomento' },
            { id: 'vc', label: 'Fundo de Investimento / Venture Capital' },
            { id: 'anjo', label: 'Investidor Anjo' },
        ],
    },
]

// Lista "achatada" de todos os tipos (com a cor e a área de cada um).
export const ACTOR_TYPES = ACTOR_AREAS.flatMap((area) =>
    area.types.map((type) => ({
        ...type,
        area: area.id,
        areaLabel: area.label,
        color: area.color,
    })),
)

export function labelForType(typeId) {
    return ACTOR_TYPES.find((type) => type.id === typeId)?.label ?? 'Ator'
}

export function colorForType(typeId) {
    return ACTOR_TYPES.find((type) => type.id === typeId)?.color ?? '#f48634'
}
