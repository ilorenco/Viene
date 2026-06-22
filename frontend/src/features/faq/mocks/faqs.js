// Perguntas frequentes (mock). Servem tanto à página pública /ajuda quanto à
// gestão no módulo de administração.
//
// Cada pergunta tem uma `category` = a PÁGINA/seção da plataforma a que a dúvida
// se refere. É o que alimenta o filtro "Filtrar por página" da tela de Ajuda.
// Os rótulos ficam em FAQ_PAGE_OPTIONS (fonte única para o dropdown).

export const FAQ_PAGE_OPTIONS = [
    { value: 'todas', label: 'Todas as páginas' },
    { value: 'mapa', label: 'Mapa' },
    { value: 'eventos', label: 'Eventos' },
    { value: 'atores', label: 'Atores' },
    { value: 'conta', label: 'Conta e acesso' },
    { value: 'favoritos', label: 'Favoritos' },
    { value: 'acessibilidade', label: 'Acessibilidade' },
    { value: 'geral', label: 'Geral' },
]

// Mapa value -> label, derivado de FAQ_PAGE_OPTIONS (evita redeclarar os rótulos).
export const FAQ_PAGE_LABELS = Object.fromEntries(
    FAQ_PAGE_OPTIONS.map((option) => [option.value, option.label]),
)
