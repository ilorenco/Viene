// Validações simples reutilizadas nos formulários de autenticação.

export function isValidEmail(email) {
    // Normaliza para string e remove espaços antes de validar (evita erro com null/undefined).
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim())
}

// Regra de negócio RN_002: senha com requisitos mínimos de complexidade.
// Aqui exigimos pelo menos 8 caracteres, contendo letras e números.
export function isStrongPassword(password) {
    // Normaliza para string para não quebrar com null/undefined.
    const value = String(password ?? '')
    return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value)
}
