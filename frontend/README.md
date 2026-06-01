# Viene — Frontend

Aplicação web (mobile-first) da plataforma **Viene**.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **React Router 7**
- **Radix UI** (Dialog, Select) · **lucide-react** (ícones) · **Leaflet** (mapa)

## Pré-requisitos

- **Node 20.19+** ou **22.12+** (recomendado: Node 22 LTS) — exigência do Vite 8
- **npm**

## Rodando localmente

```bash
cd frontend
npm install
npm run dev
```

O app sobe em http://localhost:5173.

## Scripts

| Script                 | O que faz                                 |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento (hot reload)  |
| `npm run build`        | Build de produção em `dist/`              |
| `npm run preview`      | Servir o build localmente                 |
| `npm run lint`         | Roda o ESLint                             |
| `npm run format`       | Formata o código com Prettier             |
| `npm run format:check` | Confere a formatação sem alterar arquivos |

## Como contribuir

A branch `main` é protegida: **push direto é bloqueado** (exceto para admins). Toda
mudança entra via Pull Request.

1. **Crie uma branch** a partir da `main`, nomeada por tipo:
    ```bash
    git checkout main && git pull
    git checkout -b feat/nome-curto      # ou fix/, refactor/, chore/, docs/
    ```
2. **Faça os commits** no padrão [Conventional Commits](https://www.conventionalcommits.org/),
   em português:
    ```
    feat: adiciona página de mapa
    fix: corrige rota quebrada no menu
    ```
3. **Antes de abrir o PR**, garanta que está formatado e sem erros de lint:
    ```bash
    npm run format
    npm run lint
    ```
4. **Abra o PR** para a `main` e preencha o template.
    - Mudanças em `frontend/` exigem aprovação do code owner (**@ilorenco**) antes do merge.
