// Configuração central da comunicação com o back-end.
//
// Toda a "camada de dados" do front-end olha para este arquivo. Quando a API
// REST estiver pronta (ver Diagrama C4 - contêiner "API REST"), basta ajustar
// as variáveis de ambiente no arquivo .env e desligar o modo mock.

// URL base da API REST. Em desenvolvimento, o back-end Spring Boot normalmente
// roda em http://localhost:8080. Pode ser sobrescrita pelo .env (VITE_API_URL).
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

// Enquanto o banco/back-end não está conectado, usamos dados de exemplo (mock).
// Para passar a usar a API real: defina VITE_USE_MOCKS=false no arquivo .env.
export const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? 'true') !== 'false'

// Chave usada para guardar o token JWT no navegador (autenticação - ver C4).
export const TOKEN_STORAGE_KEY = 'viene.token'
