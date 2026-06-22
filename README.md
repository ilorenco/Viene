## Para Rodar o sistema:

### Backend
- Requer Java 21 (JDK)
- cd backend
- ./mvnw spring-boot:run (Windows: mvnw.cmd spring-boot:run)
- Sobe em http://localhost:8080
- Banco H2 em memória (zera a cada restart) — console em http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:viene`)
- Conta admin criada automaticamente no boot: `admin@viene.com` / `Admin123!` (senha pode ser sobrescrita pela variável de ambiente `VIENE_ADMIN_PASSWORD`)

### Frontend
- cd frontend
- cp .env.example .env (`.env` não é versionado; o `.env.example` traz os valores padrão de dev)
- npm install
- npm run dev
- Sobe em http://localhost:5173 e já espera o backend em http://localhost:8080
