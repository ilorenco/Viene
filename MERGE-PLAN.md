# VIENE — Plano-Mestre de Merge (Thiago → VieneMain)

> Documento de planejamento do porte do código do **Thiago** (`Desktop/Viene/viene`) para a
> estrutura da **main do colega** (`Desktop/VieneMain/viene`). Atualizado: 17/06/2026.

## 0. Princípios e restrições

- **Priorizar as funcionalidades do Thiago.** Onde houver conflito de funcionalidade, a versão do Thiago vence.
- **Adaptar ao método da main.** A metodologia já está MUITO alinhada (ambos feature-based, React Query + `useSuspenseQuery`, erro central no `MainLayout`, services com `await mockDelay()`). Sobram poucos ajustes de método (padding `p-4`, reconciliar backend removido).
- **Tudo LOCAL.** Nenhum `git push`, nenhum PR online, nenhum GitHub. Commits **locais** na branch `port/thiago-features`. A `main` do colega fica **intocável**.
- **Sem `npm install`.** A VieneMain já tem todas as dependências do código do Thiago (confirmado nos dois `package.json`). Nada de rede.

## 1. Estado dos repositórios

| | VieneMain (DESTINO) | Viene/Thiago (ORIGEM) |
|---|---|---|
| Branch | `main` (limpa) → trabalho em **`port/thiago-features`** | `navbar-superior` (108 arquivos não commitados = trabalho da sessão) |
| Estrutura | feature-based | feature-based (já reestruturado) |
| Já portado pelo colega | catálogo de atores (simples), navbar, **backend removido** | tudo do Thiago, mais rico |
| Dependências | **superset** das do Thiago (tem tudo + radix-slot/tabs) | — |

> Como ambos já são feature-based e a VieneMain tem as deps, o código do Thiago é um **superset** na **mesma arquitetura**. O merge = trazer as versões do Thiago e adaptar os poucos pontos de método.

## 2. Estratégia

Porte em **commits locais sequenciais** na branch `port/thiago-features`, em **ordem de dependência** (fundação antes das features), com `vite build` validando ao final. Cada feature do Thiago substitui/estende a versão (mais simples) que o colega portou.

## 3. Ordem de execução

### Fase 1 — Fundação compartilhada (o que as features precisam)
Copiar do Thiago para a VieneMain (`src/`):
- `components/ui/Badge.jsx`, `components/ui/Pagination.jsx` (a main não tem; usados por admin/listas/paginação).
- `lib/` do Thiago (superset): `atorTypes.js`, `validation.js`, `tags.js`, `adminStats.js`, `tagUsage.js`, `adminLabels.js` (+ `utils.js`/`queryClient.js` que ambos têm, ~iguais).
- `hooks/` genéricos: `useFeedback.js`, `useGridColumns.js`, `useLogout.js`, `usePagination.js` (a main só tem `useDraggableCarousel`).
- `contexts/EventFiltersContext.jsx` (a main não tem `contexts/`; usado por events + map).
- `services/questions.js` (compartilhado: admin/faq/profile; já é `mockDelay`).
- **Reconciliar tipos de ator:** a main tem `features/actors/mocks/actorTypes.js` (só `ACTOR_TYPES`). O Thiago usa `lib/atorTypes.js` (rico). → manter o `lib/atorTypes.js` do Thiago; remover/alinhar o `actorTypes.js` da main ao portar a feature de atores.

### Fase 2 — App shell e rotas
- `App.jsx`: adicionar `AccessibilityProvider` + `EventFiltersProvider` + `<AccessibilityWidget/>` (a main só tem `QueryClientProvider`).
- `routes/AppRoutes.jsx`: adotar o do Thiago — `RootLayout` (com `StopReadingOnNavigate`), **Map standalone** (fora do MainLayout), e registrar as rotas novas: `/actors/:id`, `/admin`, `/ajuda`, `/sobre`, `/configuracoes`.
- `layouts/MainLayout.jsx`: **manter o `p-4` da main** (ela já tem o ErrorBoundary central). → **adaptar os banners do Thiago** de `-mx-[5vw]`/`lg:px-[10%]` para `-mx-4` (ajuste #2, agora na hora do merge).
- `styles/`: reconciliar `index.css` + `theme.css` (tokens de cor: primary `#f48634`, secondary `#282828`, background `#f6f6f6`, danger). Manter os tokens do Thiago (as classes dos componentes dependem deles).

### Fase 3 — Features (uma por commit), priorizando o Thiago
Para cada uma: copiar `features/<dominio>/` do Thiago, ajustar imports/atorTypes, adaptar banners ao `p-4`. Ordem sugerida (piloto primeiro):
1. **actors** (piloto) — substitui o catálogo simples do colega; traz `ActorProfile` (`/actors/:id`), filtros, tags, `useFilteredActors`, `useRelatedActors/Events`, `ActorContactList`.
2. **events** — filtros categoria/busca/período, `MonthCalendar`, `EventDetails`.
3. **map** — versão rica (clusters, filtros, painel, gaveta, sugerir ponto, **controller p/ trocar de lib**). Substitui o `InnovationMap`/`UnitSheet` simples da main.
4. **admin** — feature nova inteira (Painel/Aprovações/Usuários/Plataforma).
5. **faq** + páginas `Sobre`/`Configuracoes` — features/páginas novas.
6. **accessibility** — feature nova (widget + context + StopReadingOnNavigate).
7. **home / tickets / favorites / profile** — reconciliar (Thiago já migrado p/ Suspense).
8. **auth** — Login/Register + `AuthFormContext` + `validation`. ⚠️ ver reconciliação de backend abaixo.

### Fase 4 — Verificação
`npx prettier --write` + `npx eslint src` + `npx vite build` (deve dar `✓ built`), e testar no preview. Commit local a cada fase.

## 4. Reconciliações-chave (decisões)

| Tema | Situação | Resolução proposta |
|---|---|---|
| **Backend removido** | A main removeu o backend; o `auth.js`/`http.js`/`config.js` do Thiago são stubs de API | Levar como stubs (o app funciona em mock); **FLAG p/ o colega**: ele pode querer "mock-ificar" o auth p/ honrar o remove-backend |
| **Padding `<main>`** | main `p-4` × Thiago `lg:px-[10%]` | Manter `p-4` da main; adaptar banners do Thiago p/ `-mx-4` |
| **Tipos de ator** | main `actorTypes.js` (ACTOR_TYPES) × Thiago `lib/atorTypes.js` (rico) | Usar o do Thiago (superset) |
| **ui órfãos da main** | main tem `CategoryFilter`, `SearchBar`, `EmptyState`, `Skeleton` que o Thiago não usa | Manter (não quebram) OU remover os não usados — decisão do colega |
| **Map** | substituir o map simples da main pelo rico do Thiago | Sim (prioriza Thiago) |

## 5. Rotas a registrar no `AppRoutes` da main
`/actors/:id` (ActorProfile), `/admin`, `/ajuda` (FAQ), `/sobre`, `/configuracoes` (Settings) + `RootLayout` (acessibilidade) + `/map` como rota **standalone** (fora do MainLayout).

## 6. Riscos
- Histórias git divergiram → **não** dar `git merge`/`pull` (conflito enorme); o porte é **file-level deliberado** nesta branch.
- O diff vai ser grande (o app do Thiago é bem maior) → revisão do colega feature por feature ajuda.
- Reconciliação de backend (auth) é a única decisão de produto real.

## 7. Progresso
- [x] Branch `port/thiago-features` criada (local, a partir da `main` limpa)
- [x] `node_modules` da VieneMain resolvido via **junction** → `node_modules` do Thiago (local, sem `npm install`/online). ⚠️ Para o colega buildar "de verdade", ele roda `npm install` (online) e a junction é substituída.
- [x] **Porte feito por OVERLAY** (commit local `fc73b6f`): o `src` do Thiago foi sobreposto ao da VieneMain — arquivos do Thiago vencem; exclusivos da main (CategoryFilter, SearchBar, EmptyState, Skeleton, MapActions/UnitSheet, actorTypes/actorCategories simples) ficaram como **órfãos inertes** (não foram apagados — o `rm -rf src` foi recusado por ser destrutivo demais, e o plano já mandava preservar). **142 arquivos** no commit.
- [x] **`vite build` ✓** na VieneMain (785ms). `main` intacta (`5d6d72f`).
- [ ] **Decisões do colega:** padding `lg:px-[10%]` (Thiago) vs `p-4` (main); auth/http/config (stubs — main removeu backend); limpar os órfãos inertes.
- [ ] eslint com a config da main (tem `jsx-a11y` — pode acusar a11y no código do Thiago)
- [ ] Verificação em runtime (rodar `npm run dev` na VieneMain) — o build já passou
- [ ] (opcional) Quebrar o commitão em commits por feature p/ revisão mais fácil
