// Configuração central da comunicação com o back-end.

// URL base da API REST. Em desenvolvimento, o back-end Spring Boot normalmente
// roda em http://localhost:8080. Pode ser sobrescrita pelo .env (VITE_API_URL).
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

// Chave usada para guardar o token JWT no navegador (autenticação - ver C4).
export const TOKEN_STORAGE_KEY = 'viene.token'
