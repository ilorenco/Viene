// Dados de exemplo (mock) do módulo de Administração.
// Quando o back-end estiver pronto, estes dados virão dos endpoints do
// AdminController (ver src/services/admin.js).

// Fila de moderação (GET /admin/aprovações).
// RN_003: eventos enviados por usuários entram como "Pendente" até o admin aprovar.
//   - type:          o que foi solicitado ('evento' | 'ator')
//   - submitterType: quem solicitou ('ator' | 'usuario')
//   - reviewed:      se já passou pela moderação (true) ou está pendente (false)
//   - decision:      'aprovado' | 'rejeitado' (quando reviewed) | null
//   - date:          ISO (YYYY-MM-DD) para ordenar; submittedAt é só exibição
export const mockPendingApprovals = [
    {
        id: 101,
        type: 'evento',
        title: 'Meetup de Inteligência Artificial',
        submittedBy: 'Carla Menezes',
        submitterType: 'usuario',
        reviewed: false,
        decision: null,
        date: '2026-06-02',
        submittedAt: '02 Jun. 2026',
        summary: 'Encontro sobre IA generativa aplicada a startups, no Inovaparq.',
    },
    {
        id: 102,
        type: 'ator',
        title: 'Coworking Estação Criativa',
        submittedBy: 'Estação Criativa',
        submitterType: 'ator',
        reviewed: false,
        decision: null,
        date: '2026-06-01',
        submittedAt: '01 Jun. 2026',
        summary: 'Espaço de coworking na Zona Sul que deseja entrar no mapa.',
    },
    {
        id: 103,
        type: 'evento',
        title: 'Workshop de UX para Iniciantes',
        submittedBy: 'Pedro Albuquerque',
        submitterType: 'usuario',
        reviewed: false,
        decision: null,
        date: '2026-05-31',
        submittedAt: '31 Mai. 2026',
        summary: 'Oficina prática de design de interfaces para novos profissionais.',
    },
    {
        id: 104,
        type: 'ator',
        title: 'Hub Náutico de Inovação',
        submittedBy: 'Hub Náutico',
        submitterType: 'ator',
        reviewed: false,
        decision: null,
        date: '2026-05-30',
        submittedAt: '30 Mai. 2026',
        summary: 'Hub voltado à indústria naval e tecnologias marítimas.',
    },
    {
        id: 105,
        type: 'evento',
        title: 'Demo Day Inovaparq',
        submittedBy: 'Inovaparq',
        submitterType: 'ator',
        reviewed: true,
        decision: 'aprovado',
        date: '2026-05-28',
        submittedAt: '28 Mai. 2026',
        summary: 'Apresentação de startups residentes para investidores.',
    },
    {
        id: 106,
        type: 'ator',
        title: 'Garagem Coletiva',
        submittedBy: 'Marina Souza',
        submitterType: 'usuario',
        reviewed: true,
        decision: 'rejeitado',
        date: '2026-05-24',
        submittedAt: '24 Mai. 2026',
        summary: 'Espaço maker comunitário (sem comprovação de endereço).',
    },
]

// Usuários da plataforma (GET /admin/usuarios).
// Perfis (RBAC do documento de regras): usuario, ator, admin.
export const mockAdminUsers = [
    {
        id: 1,
        name: 'João Vitor Buhring',
        email: 'joao.buhring@viene.com',
        role: 'admin',
        status: 'ativo',
        createdAt: '12 Mar. 2026',
    },
    {
        id: 2,
        name: 'Carla Menezes',
        email: 'carla.menezes@gmail.com',
        role: 'usuario',
        status: 'ativo',
        createdAt: '20 Abr. 2026',
    },
    {
        id: 3,
        name: 'Inovaparq',
        email: 'contato@inovaparq.com.br',
        role: 'ator',
        status: 'ativo',
        createdAt: '03 Mai. 2026',
    },
    {
        id: 4,
        name: 'Pedro Albuquerque',
        email: 'pedro.alb@outlook.com',
        role: 'usuario',
        status: 'bloqueado',
        createdAt: '15 Mai. 2026',
    },
    {
        id: 5,
        name: 'Sapiens Parque',
        email: 'contato@sapiensparque.com.br',
        role: 'ator',
        status: 'ativo',
        createdAt: '22 Mai. 2026',
    },
    {
        id: 6,
        name: 'Luana Azevedo',
        email: 'luana.azevedo@gmail.com',
        role: 'usuario',
        status: 'ativo',
        createdAt: '28 Mai. 2026',
    },
]
