# VIENE — Código obsoleto / não utilizado (para verificar e remover depois)

> Lista de candidatos a remoção. Cada item foi marcado como **sem uso** quando uma
> busca por `import` no `src/` não encontrou nenhum consumidor (só a própria
> definição). **Antes de apagar**, confirmar com uma busca atualizada (ou uma
> ferramenta de dead-code, ex.: `knip`) e rodar `vite build`.
>
> Gerado em **18/06/2026**. Pasta: `Desktop/VieneMain/viene/frontend/src`.
>
> ✅ **EXECUTADO em 19/06/2026:** TODOS os itens das seções 1 e 2 abaixo foram
> **removidos** (confirmado: nenhum `import` + `vite build` ✓), MAIS 3 órfãos da
> feature *map* descobertos durante o polimento do mapa:
> `features/map/pinIcon.js` (o `InnovationMap` define o `createPinIcon` localmente),
> `features/map/mocks/innovationUnits.js` (o service usa `mockActors`) e
> `features/map/components/MapTopBar.jsx` (sem import). **Total: 14 arquivos + o
> export `mockAdminStats`.** A lista abaixo fica como histórico.

## 1. Órfãos do merge (componentes da main do colega que o overlay do Thiago não usa)

Esses foram preservados no merge (o `rm -rf src` foi recusado por destrutivo) e
nunca chegaram a ser importados pela versão do Thiago:

- [ ] `components/feedback/EmptyState.jsx` — sem import.
- [ ] `components/ui/CategoryFilter.jsx` — sem import (as telas usam o `Select` + filtros próprios).
- [ ] `components/ui/SearchBar.jsx` — sem import (as buscas são inline nos banners).
- [ ] `components/ui/Skeleton.jsx` — sem import (cada feature tem seu próprio `*Skeleton`/fallback).
- [ ] `features/map/components/MapActions.jsx` — sem import (o mapa rico do Thiago substituiu).
- [ ] `features/map/components/UnitSheet.jsx` — sem import (idem; o detalhe do mapa é `MapDetailCard`/`MapMobileSheet`).
- [ ] `features/actors/components/RegisterActorForm.jsx` — sem import (a tela usa `RegisterActorModal`).
- [ ] `features/actors/mocks/actorTypes.js` — só era importado por `RegisterActorForm` (morto). O vivo é `lib/atorTypes.js`.
- [ ] `features/actors/mocks/actorCategories.js` — sem import.

## 2. Ficou obsoleto durante o desenvolvimento

- [ ] `features/admin/components/AdminAbout.jsx` — **substituído** por `AdminDenuncias` na aba "Plataforma" (a opção "Sobre" virou "Denúncias", 18/06/2026). Não é mais importado.
- [ ] `features/admin/mocks/admin.js` → export `mockAdminStats` — **export não utilizado** (o painel usa contagens ao vivo via hooks). Remover só o export, manter o arquivo (ele ainda exporta `mockAdminUsers`/`mockPendingApprovals`, que são usados).
- [ ] `public/favicon-blue.png` — **substituído** por `public/favicon-blue.svg` (favicon quadrado do modo noturno). O `.png` não é mais referenciado.

## 3. Observações

- Esta lista **não é exaustiva** — cobre os órfãos documentados no `MERGE-PLAN.md` + o
  que ficou obsoleto nas últimas sessões. Para um varrimento completo de dead-code,
  rodar uma ferramenta dedicada (ex.: `npx knip`) quando a VieneMain tiver
  `npm install` próprio (hoje o `node_modules` é uma junction).
- **Não remover sem checar de novo:** o código pode passar a ser usado a qualquer
  momento; reconfirmar a ausência de `import` antes de apagar cada arquivo.
