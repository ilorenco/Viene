# VIENE — Handoff geral (para nova sessão)

> Cole/aponte este arquivo no início da nova sessão. **Pasta de trabalho ATUAL:** `Desktop/VieneMain/viene` (frontend em `frontend/`).
> Última atualização: **18–19/06/2026** — fim de uma sessão LONGA de polimento de quase todas as telas (perto do limite de 1M de contexto).
> Documentos vizinhos: `MERGE-PLAN.md` (como o merge foi feito) e `CODIGO-OBSOLETO.md` (lista de código morto a remover).

---

## 0. LEIA PRIMEIRO — o essencial

**VIENE** = plataforma web **mobile-first** de **mapeamento do ecossistema de inovação de Joinville/SC** (projeto acadêmico UNIVILLE "VIV-V", feito **COM UM COLEGA**). Marca: laranja **`#f48634`**, escuro **`#282828`**, fundo `#f6f6f6`; fontes **Montserrat** (títulos) + **Inter** (texto); ícones **Lucide**. Stack: **React 19 + Vite + React Query (`useSuspenseQuery`) + Tailwind v4 + react-router + Leaflet** (mapa). **TUDO é mock** (o colega removeu o backend); a camada de serviços está pronta para virar API REST.

### ⚠️ ONDE TRABALHAR
- **Pasta ATUAL: `Desktop/VieneMain/viene`** — branch **`port/thiago-features`** (a `main` do colega é intocável). **TUDO LOCAL** — sem `git push`/PR/GitHub (instrução explícita do Thiago).
- ✅ **`npm install` FEITO na VieneMain (19/06/2026)** — a junction foi removida (só o link, via `rmdir`; a pasta antiga ficou intacta) e o `node_modules` agora é próprio. Resultado: **`eslint` roda** (`npx eslint <arqs>`) e **as fontes da marca carregam no preview**. (Histórico: antes era uma JUNCTION p/ `Desktop/Viene/viene/frontend/node_modules`, o que bloqueava eslint e fontes.)
- Pasta antiga `Desktop/Viene/viene` = origem/backup pré-merge.

---

## 1. Como rodar e VERIFICAR

- **Preview do Claude:** `preview_start` name **`vienemain-frontend`** (porta **5300**, via `Desktop/Viene/.claude/launch.json`). Dev do Thiago: `npm run dev` (5173).
- **Verificar por `preview_eval`** (lê DOM/estilos/cliques). ⚠️ **Screenshots TRAVAM** (renderizador headless). Outras coisas que **só funcionam no navegador real, não no preview headless** (não confiar que estão quebradas se o eval não pegar): **scroll suave** (`behavior:'smooth'` é no-op), **barra de rolagem** customizada (overlay → `offsetWidth-clientWidth=0`). `preview_resize` muda o viewport mas **não dispara `resize`** → recarregar na largura desejada.
- **Antes de concluir SEMPRE:** `npx prettier --write <arqs>` + `npx vite build` (esperar `✓ built`) e **apagar `dist/`**. (Eslint só após `npm install`.)
- ⚠️ **GOTCHA recorrente — resíduo de HMR:** editar vários arquivos numa tacada deixa o dev server com módulos antigos em cache → erros fantasmas no console (`X is not defined`) e **as lojas mock em memória ZERAM** (ver §5). Confirmar pelo **build/grep**, não pelo console. Para limpar de vez: **`preview_stop` + `preview_start`** (restart do dev server).
- Convenções: 4 espaços, `cn()` (clsx+tailwind-merge), `cva`, alias `@/`→`src/`, comentários/UI em **pt-BR**, imports/classes Tailwind ordenados (prettier). Full-bleed: componente `FullBleed` (`left-1/2 -ml-[50vw] w-screen`) ou `-mx-4 lg:-mx-[5vw]`; para cancelar o padding do `<main>` (`lg:px-[10%]`) use `vw`, não `%` (bases diferentes).

---

## 2. Arquitetura e método (padrão feature-based do colega)

- `src/features/<dominio>/{components,hooks,services,mocks}` — **actors, events, map, admin, faq, favorites, tickets, accessibility** (+ `pages/auth`).
- **Compartilhado:** `components/{ui,layout,feedback}`, `lib/*` (`utils`, `atorTypes`, `tags`, `validation`, `adminStats`, `tagUsage`, `adminLabels`, `queryClient`), `hooks` genéricos (`usePagination`, `useGridColumns`, `useFeedback`, `useLogout`, `useDraggableCarousel`), `services/{auth,config,http,questions}`, `contexts/EventFiltersContext`, `mocks/delay` (mockDelay = 400ms), `pages`, `layouts`, `routes`, `styles`.
- **Método:** React Query + `useSuspenseQuery` + `<Suspense>`; **erro CENTRAL** no `MainLayout` (`components/feedback/RouteError`). Services fazem `await mockDelay()` e devolvem o mock; nomes `getXById`. O `MainLayout` usa `px-4 pt-4 pb-4 lg:px-[10%]` (mantiveram o padding do Thiago, NÃO o `p-4`).
- **Rotas** (`routes/AppRoutes.jsx`): `RootLayout` (com `<ScrollToTop/>` + `<StopReadingOnNavigate/>`) → `MainLayout` com `/`(Home), `/favorites`, `/tickets`, `/actors`, `/actors/:id`, `/events`, `/events/:id`, `/profile`, `/sobre`, `/configuracoes`, `/ajuda`(FAQ), `/admin`; `AuthLayout` com `/login`,`/register`; **`/map` é standalone** (fora do MainLayout, boundary próprio). Header é **sticky** (`top-0 z-40`).

---

## 3. Estado das telas (todas POLIDAS nesta sessão, salvo o Mapa)

- **Home (`/`)** — `HomeIntroCarousel` (carrossel de apresentação; título/setas/CTA em posições FIXAS via `lg:items-stretch` + texto `flex-1`), `HomeExplore` (seção escura full-bleed com filtros + carrosséis), `HomeMapGuide`. Tem `pb-8 lg:pb-12` (respiro até o footer).
- **Catálogo de Atores (`/actors`)** — banner escuro (título+busca), filtros (área dropdown desktop / carrossel mobile, tag dropdown, "Cadastrar ator"), `ActorList` + paginação. Mobile: botões do carrossel ~1.5x mais altos; tag/cadastrar com **ícone ao lado do texto**.
- **Especificação de Ator (`/actors/:id`)** — banner + imagem + título (com **ActorActions**: ❤️ favoritar + ⋮ menu Compartilhar/Denunciar) + tags + Localização/Fundação + descrição + contatos + relacionados (Eventos, Atores).
- **Catálogo de Eventos (`/events`)** — igual aos atores, mas categoria ("Todas as Tags") + `EventDateFilter`. Carrossel de tipos no mobile (~1.5x mais alto). **(19/06):** o filtro de data virou UM botão **"Selecionar Período"** (modal único: calendário "ou" "em até X dias") e ganhou **"Cadastrar evento"** (botão ao lado dos filtros → novo `RegisterEventModal`, espelha o de ator; sem persistência ainda).
- **Especificação de Evento (`/events/:id`)** — NOVA, gêmea do ActorProfile: banner com **tipo** do evento, **tag de evento**, **Data** + **início**/**término**, **link do ingresso** (Sympla, `ticketUrl` mock) abaixo da descrição, **ActorActions** (entityType="evento"), relacionados na ordem **Atores → Eventos** (hooks `useEventRelatedActors/Events`).
- **Favoritos (`/favorites`)** — banner+busca, dois botões (Eventos/Atores estilo cartão), painéis (`FavoriteEventsPanel`/`FavoriteActorsPanel`) que reusam os MESMOS filtros e cards dos catálogos. (Sem persistência real ainda → mostram o catálogo completo.)
- **Ingressos (`/tickets`)** — banner+busca estilo Eventos + filtros (categoria/data) + **`TicketAlerts`** (avisos de eventos próximos, ≤7 dias, popover). Posição do Alertas: **desktop** abaixo da busca; **mobile** sino compacto com marcador no canto, ao lado do título.
- **FAQ (`/ajuda`)** — header estilo catálogo + filtro "por página" (seção) + botão "Ver mais/menos" + grade 2 colunas (6→12) + paginação + banda escura full-bleed "Não encontrou sua resposta?".
- **Configurações (`/configuracoes`)** — banner (sem busca); **layout alinhado às demais páginas (19/06)**: virou fragmento usando o `gap-5`/`lg:px-[10%]` do `main` (saiu o `lg:px-[5%]` extra + `gap-8/10` próprios) → banner e largura idênticos aos catálogos. **Perfil (`/profile`) idem (19/06):** banner virou full-bleed (`-mx-4 lg:-mx-[5vw]`, era caixinha `rounded-lg`), títulos de seção `font-montserrat`/`text-secondary` (era `font-inter`/`text-foreground`) e cards `rounded-2xl`+borda (era `shadow-sm`); `MyQuestions` alinhado igual. Informações pessoais (upload de **foto**, **data de nascimento**, "Salvar" no topo), **Acessibilidade** (`AccessibilityControls compact`: fundo escuro arredondado, layout 30/70 no desktop, empilhado no mobile, "Ler a página" sob a fonte), Termos, Sair.
- **Sobre (`/sobre`)** — refeita conforme mockup: hero ("CONECTANDO A INOVAÇÃO" + ícone-pino encostado no canto direito + caixas cinza), 2 cartões escuros (nome/ícone), **Missão | Visão | Valores** (com retângulo laranja de fundo no desktop), 4 seções de área (imagens em `src/assets/areas/`, cores das áreas, traços `TopTrace`/`BottomTrace` que **ultrapassam as bordas da tela**).
- **Admin (`/admin`)** — Painel/Aprovações/Usuários/**Plataforma**. Plataforma: Perguntas, Tags e **Denúncias** (substituiu "Sobre"; `AdminDenuncias` lista as denúncias de atores/eventos com badge de tipo + "Resolver").
- **Navbar (Header)** — itens (Mapeamento/Eventos/Atores) maiores e mais em negrito, **laranja na rota ativa** (`NavLink`), **ícone ao lado do nome no desktop**, **logo azul no modo noturno**.
- **Formulários de cadastro (19/06)** — os `<select>` NATIVOS (Tipo de ator/evento) viraram o **`Select` temático (Radix)** em `RegisterActorModal`, `RegisterEventModal` e `SuggestPointModal`: as opções agora acompanham o tema no dia E na noite (o nativo pintava branco/cinza-do-SO). ⚠️ Radix Select dentro do Modal (Radix Dialog) exige `z-[2100]` no `SelectContent` (acima do modal z-2000) — já aplicado. Também associei os labels (`htmlFor`/`id`) → esses 3 modais ficaram **sem os erros `jsx-a11y`** que sobravam. Datas/horas seguem nativas (não são "opções"). Home: carrossel de intro com `min-h-[15rem]` (era 19rem) p/ encostar o CTA logo abaixo da maior descrição no mobile.
- **Footer reescrito (19/06)** — `components/layout/Footer.jsx`: logo (azul no noturno / branca no dia, via `useAccessibility`), 3 colunas — **Navegação e Institucional** (Sobre → `/sobre`; **Mapa do site** = `<a download href="/sitemap.pdf">`, ⚠️ falta colocar o arquivo em `public/sitemap.pdf`), **Jurídico e Segurança** (Política/Termos = **popup** `Modal` placeholder; selos SSL/Reclame sem link), **Suporte e Contatos** (FAQ → `/ajuda`; redes Instagram/LinkedIn/YouTube → `/404`) + faixa **Copyright © {ano}**. ⚠️ **Gotcha:** os ícones de marca (Instagram/Linkedin/Youtube) **NÃO existem mais no lucide-react** (removidos por marca registrada) → usei **SVG inline**. O eslint NÃO pega isso (só o `vite build`). Sobre: título do hero menor (`text-3xl lg:text-4xl`) e imagem maior (`max-w-md lg:w-[28rem]`).
- **Login/Auth redesenhado (19/06)** — `layouts/AuthLayout.jsx` = **tela cheia (sem card/arredondado) de DOIS painéis**: ESQUERDA = logo (troca no noturno) + form (`Outlet`, largura `max-w-md` centralizada); DIREITA = imagem `assets/auth/background.png` (cover) + "Venha Inovar!" + subtítulo (`hidden md:flex`). Tela cheia para caber sem rolar. ⚠️ **Responsivo proposital:** dois painéis a partir de **`md` (768px = tablet)**; abaixo vira coluna única (mobile). Assim encolher o desktop NÃO cai direto no mobile — só abaixo de tablet. `Login.jsx` refeito no estilo do mockup (heading "Olá! Bem-vindo de volta", campos com ícone mail/cadeado via `pl-14`, "Lembrar de mim" [só visual] + "Esqueci a senha", botão "Entrar", link "Criar conta") — **sem** login social/"ou" (nunca teve). `Register.jsx` ganhou um heading p/ casar com o painel. (As `handle.title` das rotas de auth no `AppRoutes` ficaram sem uso.) **Animação Login↔Cadastro (19/06):** ao ir p/ `/register` a imagem desliza p/ a ESQUERDA e o form p/ a DIREITA (inverso ao voltar) — `transition-transform` + `md:translate-x-full`/`md:-translate-x-full` decididos pela rota (`useLocation`). Funciona porque o `AuthLayout` PERSISTE entre as rotas (só o `Outlet` troca) → mantém a troca de endereço sem acoplar as telas. Transforms são `md:` (mobile não desliza). ⚠️ **Gotcha:** classes utilitárias NOVAS do Tailwind (ex.: `md:translate-x-full`) às vezes NÃO são geradas pelo dev server via HMR (ficam com valor 0) → **`preview_stop`+`preview_start`** regenera; o `vite build` já gera certo. **Ajustes (19/06):** no MOBILE voltou a **faixa de imagem no topo** (`md:hidden`, `background.png`) com o form subindo sobre ela (`-mt-6 rounded-t-3xl`, cancelados no `md:`); campos do auth um pouco menores **só no desktop** (`md:py-3`, 16→12px) em `Login.jsx`/`Register.jsx`.
- **Mapa (`/map`)** — rico (clusters, filtros, painel, sugerir ponto). **Passe de polimento em 19/06/2026:** `viene-scrollbar` nas 5 áreas de rolagem (painel lateral, filtros, gaveta mobile, detalhe-sheet e popup de cluster) + **estilo de modo noturno do popup do Leaflet** (antes era caixa branca com texto cinza-claro, ilegível no escuro). Sem mudanças de layout — a base já estava sólida (dark dos tiles já existia no `index.css`). **+ incrementos (19/06):** busca do mapa agora é **ao digitar** (estado único `search` em `Map.jsx`, sem botão obrigatório, igual aos catálogos); o detalhe do ator no mapa (`MapDetailAction`) agora leva à **página do ator** (`/actors/:id`) — antes ia ao site externo/catálogo; ficou simétrico ao evento (`/events/:id`).
- **Dropdowns (geral, 19/06):** reexposta a barra de rolagem do **Radix Select** via `[data-radix-select-viewport].viene-scrollbar` no `index.css`. ⚠️ **Gotcha:** o Radix injeta `scrollbar-width:none` no viewport (ele assume os botões de rolagem), escondendo a `.viene-scrollbar` e tirando a pista de "há mais opções" — a regra nova vence por especificidade. Afeta tags/áreas/categorias em atores, eventos, tickets, faq, favoritos, home.

---

## 4. O que foi feito nesta sessão (resumo)

Polimento amplo guiado pelo Thiago (muitas iterações de layout, sempre verificando no preview): redesenho de FAQ, Favoritos, Configurações, Ingressos, Sobre; correção do carrossel da Home; navbar (ícones+ativo+logo noturno); **modo noturno** (azul `#3B59A4`, texto de busca branco, `bg-secondary` mais claro `#34343f`, `text-background` clareado, logo+favicon azuis); **especificação de Eventos** nova; **ActorActions** (favoritar + compartilhar + **denunciar com justificativa**) em atores e eventos; **Denúncias no Admin**; **busca automática** (ao digitar) em todos os catálogos; **scroll ao topo** ao trocar de rota e ao paginar; **dropdown do Select** (limita a ~5 itens + scroll + barra visível `.viene-scrollbar`); botões de carrossel mobile maiores. Imagens de tema escuro copiadas de `Desktop/VieneMain/Imagens` (logo/ícone azuis); imagens de área de `Imagens-Areaas-Atores` → `src/assets/areas/`.

---

## 5. Lojas mock em memória (⚠️ ZERAM em reload/HMR)

Serviços com cópia mutável em memória (simulam o banco até a API existir):
- `features/admin/services/admin.js` — `approvals`, `users`.
- `features/admin/services/reports.js` — **denúncias** (`submitReport({name,type,reason})`, `listReports`, `resolveReport`). Lidas por `useAdminReports` (ADMIN_KEYS.reports) e mostradas em **Plataforma > Denúncias**. ⚠️ editar o arquivo (HMR) ou recarregar a página **zera a lista** — testar denúncia→admin **sem reload** (navegação SPA via `pushState`+`popstate`).
- `features/admin/hooks/useTagGroup.js` / `services/tags.js` — tags.
- Favoritar (ActorActions/LikeButton) e o upload de foto (Settings, `URL.createObjectURL`) são estado em memória/local — sem persistência.

---

## 6. Pendências / próximos passos

- ✅ **`npm install` na VieneMain — FEITO (19/06/2026)**: junction removida, eslint e fontes do preview funcionando.
- ✅ **Código obsoleto — REMOVIDO (19/06/2026):** 14 órfãos (os do `CODIGO-OBSOLETO.md` + 3 da feature *map*: `pinIcon.js`, `mocks/innovationUnits.js`, `MapTopBar.jsx`) e o export `mockAdminStats`. `vite build` ✓ após a limpeza. Ver `CODIGO-OBSOLETO.md` (atualizado).
- ✅ **`npm audit` — RESOLVIDO (19/06)**: `npm audit fix` (SEM `--force`, só updates compatíveis com o `package.json`) → **0 vulnerabilidades**. Eram todas dev-deps: **vite (high)** = vuln do DEV SERVER no Windows (UNC/`fs.deny`), `react-router` (low, CSRF doc requests), `@babel/core` (low). 30 pacotes atualizados, `vite build` ✓ depois.
- ✅ **Auditoria de método (19/06)** — varredura multi-agente de todas as telas vs. o método do colega (React Query/Suspense/erro central/services mockDelay/desacoplamento). Veredito: **projeto muito consistente**; varredura global de anti-padrões LIMPA (zero useEffect+fetch, zero useQuery solto, nenhuma página/componente chamando service de leitura direto, ErrorBoundary só em MainLayout+Map). **5 achados confirmados e JÁ CORRIGIDOS:** (1) Home — lógica de filtro saiu do `ExploreCarousels` p/ novo `features/home/hooks/useExploreCarousels.js`; (2) Mapa — `SuggestPointModal` agora usa `useMutation` via novo `features/map/hooks/useSuggestPoint.js`; (3) Mapa — `InnovationMap`/`LocationPicker` agora importam `features/map/constants.js` (antes duplicado inline); (4) perguntas em UMA `queryKey` única (`QUESTIONS_KEY` em `services/questions.js`, usada por Perfil e Admin) — antes `['questions']` vs `['admin','questions']` davam cache incoerente; (5) `QuestionForm` agora invalida o cache de perguntas ao enviar.
- **Quebrar o commitão do merge** em commits por feature (hoje é 1 commit `fc73b6f`) — quando o Thiago quiser revisar com o colega.
- **Decisões do colega:** padding `p-4` × `lg:px-[10%]`; reconciliar `auth/http/config` (stubs do backend removido).
- **Sympla:** o link do ingresso só precisa da URL do evento (sem API). Para sincronizar eventos/inscrições existe a API REST do Sympla (token `S_TOKEN`). `ticketUrl` está mock por evento.
- Possível: renomear `ActorActions` → `EntityActions` (já é genérico, usado por atores e eventos); persistência real de favoritos.

---

## 7. Estilo de trabalho do Thiago

Itera MUITO em layout; gosta que eu **VERIFIQUE no preview e mostre a prova** (medições por `preview_eval`) antes de dizer "pronto"; **explico o porquê** de forma didática (iniciante); **confirmo antes de mudanças grandes**; **backup antes de mexer no git**. pt-BR. (Identidade no chat às vezes aparece como "Kauan" pelo e-mail; o trabalho/git é "Thiago".)
