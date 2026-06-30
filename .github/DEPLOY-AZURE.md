# Deploy automático no Azure (GitHub Actions)

Este repositório tem dois workflows de deploy que rodam **ao dar push na `main`**
(ou manualmente pela aba **Actions** → *Run workflow*):

| Workflow | O que publica | Recurso no Azure |
|---|---|---|
| `deploy-backend.yml` | Back-end Spring Boot (`backend/`) | App Service **`viene-api`** |
| `deploy-frontend.yml` | Front-end Vite/React (`frontend/`) | Static Web App **`viene-frontend`** |

Tudo dentro do grupo de recursos **`rg-vienne-south-america`**.

> ⚠️ Os workflows **não funcionam até os dois segredos abaixo serem cadastrados**.
> Cadastre-os **antes** de mergear na `main` (ou rode manualmente depois, pela aba Actions).

## Segredos a cadastrar
Em **Settings → Secrets and variables → Actions → New repository secret**:

### 1. `AZUREAPPSERVICE_PUBLISHPROFILE` (back-end)
Conteúdo = o XML do *publish profile* do App Service. Para obter (Azure CLI):
```bash
az webapp deployment list-publishing-profiles \
  --name viene-api --resource-group rg-vienne-south-america --xml
```
Copie **todo** o XML retornado e cole como valor do segredo.
(Pelo Portal: App Service `viene-api` → *Visão geral* → **Baixar perfil de publicação**.)

### 2. `AZURE_STATIC_WEB_APPS_API_TOKEN` (front-end)
Conteúdo = o token de deploy do Static Web App. Para obter:
```bash
az staticwebapp secrets list \
  --name viene-frontend --resource-group rg-vienne-south-america \
  --query "properties.apiKey" -o tsv
```
(Pelo Portal: Static Web App `viene-frontend` → **Gerenciar token de implantação**.)

## Observações importantes
- **SCM basic auth** foi habilitado no `viene-api` (necessário pro publish profile).
- O back-end **não lê senha de banco do código**. As credenciais ficam em
  **variáveis de ambiente do App Service** (`SPRING_DATASOURCE_URL/USERNAME/PASSWORD`,
  `VIENE_JWT_SECRET`, `VIENE_ADMIN_PASSWORD`, `VIENE_CORS_ALLOWED_ORIGINS`). O deploy
  só troca o `.jar` — **não mexe nessas variáveis**, então elas continuam valendo.
- O front-end usa `VITE_API_URL` no build, fixado no próprio `deploy-frontend.yml`
  (é uma URL pública, não é segredo).
- Roteamento do SPA: `frontend/public/staticwebapp.config.json` faz o fallback pro
  `index.html` (sem ele, abrir/atualizar uma rota interna dava 404).
