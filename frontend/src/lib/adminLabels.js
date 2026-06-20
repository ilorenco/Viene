// Rótulos e cores (variantes de Badge) usados no módulo de Administração.
// Perfis seguem o RBAC do Documento de Regras de Negócio.

export const ROLE_LABELS = {
    admin: 'Administrador',
    ator: 'Ator',
    usuario: 'Usuário',
}

export const ROLE_VARIANTS = {
    admin: 'primary',
    ator: 'secondary',
    usuario: 'neutral',
}

export const STATUS_LABELS = {
    ativo: 'Ativo',
    bloqueado: 'Bloqueado',
}

export const STATUS_VARIANTS = {
    ativo: 'success',
    bloqueado: 'danger',
}

export const TYPE_LABELS = {
    evento: 'Evento',
    ator: 'Ator',
}

export const TYPE_VARIANTS = {
    evento: 'primary',
    ator: 'secondary',
}
