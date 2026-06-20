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

export const mockFaqs = [
    {
        id: 1,
        category: 'mapa',
        question: 'Como vejo as informações de um ponto no mapa?',
        answer: 'No mapa, toque em um "ping" (marcador) para abrir o painel com o nome do ator, a descrição e os detalhes. Você pode arrastar o mapa e aproximar para encontrar outros pontos próximos.',
    },
    {
        id: 2,
        category: 'eventos',
        question: 'Como me inscrevo em um evento?',
        answer: 'Abra a aba Eventos, toque no evento para ver os detalhes e use o botão de inscrição. É preciso ter uma conta criada e estar logado para se inscrever.',
    },
    {
        id: 3,
        category: 'favoritos',
        question: 'Como favorito um evento ou um ator?',
        answer: 'Toque no ícone de coração no card do evento ou ator. Os itens favoritados aparecem na página "Favoritos", separados entre Eventos e Atores.',
    },
    {
        id: 4,
        category: 'conta',
        question: 'Como crio uma conta?',
        answer: 'Na tela de Login, toque em "Criar conta" e preencha nome, e-mail e senha. Também é necessário aceitar os Termos de Uso para finalizar o cadastro.',
    },
    {
        id: 5,
        category: 'conta',
        question: 'Esqueci minha senha. E agora?',
        answer: 'Na tela de Login, toque em "Esqueci a senha...", informe o seu e-mail e enviaremos as instruções de recuperação.',
    },
    {
        id: 6,
        category: 'mapa',
        question: 'Posso sugerir um novo ponto no mapa?',
        answer: 'Sim! Usuários cadastrados podem sugerir novos pontos. A sugestão passa pela moderação de um administrador antes de aparecer publicamente no mapa.',
    },
    {
        id: 7,
        category: 'eventos',
        question: 'Por que meu evento aparece como "pendente"?',
        answer: 'Eventos criados por usuários entram como pendentes e só são publicados após a aprovação de um administrador. Assim garantimos a qualidade das informações.',
    },
    {
        id: 8,
        category: 'acessibilidade',
        question: 'Como ativo o modo noturno e outros recursos de acessibilidade?',
        answer: 'Toque no botão de acessibilidade no canto direito da tela. Lá você ativa o modo noturno, o filtro de daltonismo, o realce de palavras e a leitura da página em voz alta.',
    },
    {
        id: 9,
        category: 'atores',
        question: 'O que são os "atores" no Viene?',
        answer: 'Atores são os agentes do ecossistema de inovação da região: parques tecnológicos, startups, universidades, incubadoras, investidores e instituições. O catálogo reúne todos eles em um só lugar.',
    },
    {
        id: 10,
        category: 'atores',
        question: 'Como filtro atores por área ou por tag?',
        answer: 'Na página Atores, use o campo de busca e os filtros de área (Ambientes de Inovação, Setor Privado, Educação e Setor Público) e de tags de tecnologia para encontrar exatamente o tipo de ator que procura.',
    },
    {
        id: 11,
        category: 'atores',
        question: 'Como cadastro um novo ator?',
        answer: 'Na página Atores, toque em "Cadastrar ator" e preencha as informações. O cadastro passa pela moderação de um administrador antes de aparecer no catálogo e no mapa.',
    },
    {
        id: 12,
        category: 'eventos',
        question: 'Onde vejo os eventos em que me inscrevi?',
        answer: 'Os eventos em que você se inscreveu ficam na página "Meus ingressos", acessível pelo seu perfil. Lá você acompanha as datas e os detalhes de cada inscrição.',
    },
    {
        id: 13,
        category: 'mapa',
        question: 'O que significam as cores dos marcadores no mapa?',
        answer: 'Cada cor representa uma área de atuação do ator: Ambientes de Inovação, Setor Privado e Negócios, Educação/Ciência/Pesquisa e Setor Público e Institucional. A legenda fica disponível no próprio mapa.',
    },
    {
        id: 14,
        category: 'conta',
        question: 'Como edito as informações do meu perfil?',
        answer: 'Acesse a página Perfil e abra as Configurações para atualizar seus dados, sua foto e suas preferências. As alterações são salvas na sua conta.',
    },
    {
        id: 15,
        category: 'favoritos',
        question: 'Meus favoritos somem se eu sair da conta?',
        answer: 'Não. Os favoritos ficam vinculados à sua conta, então continuam disponíveis sempre que você entrar novamente, em qualquer dispositivo.',
    },
    {
        id: 16,
        category: 'geral',
        question: 'O Viene é gratuito?',
        answer: 'Sim. O Viene é uma plataforma de mapeamento do ecossistema de inovação de Joinville e o acesso ao catálogo, ao mapa e aos eventos é gratuito.',
    },
    {
        id: 17,
        category: 'geral',
        question: 'Como funciona o mapeamento da inovação?',
        answer: 'O Viene reúne os atores de inovação da região e os conecta em uma grande rede. Você navega pelo mapa e pelo catálogo para descobrir quem move a inovação por aqui e como tudo se conecta.',
    },
    {
        id: 18,
        category: 'acessibilidade',
        question: 'Posso ouvir o conteúdo da página em voz alta?',
        answer: 'Sim. No botão de acessibilidade, ative a leitura em voz alta. A leitura é interrompida automaticamente quando você navega para outra página.',
    },
]
