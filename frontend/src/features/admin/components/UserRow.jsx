// Linha de um usuário na lista de gerenciamento. Ações à direita: Mais
// informações (olho), Bloquear/Desbloquear (alterna o ícone) e Excluir (lixeira).

import { Ban, CircleCheck, Eye, Trash2 } from 'lucide-react'

import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { ROLE_LABELS, ROLE_VARIANTS, STATUS_LABELS, STATUS_VARIANTS } from '@/lib/adminLabels'

export function UserRow({ user, onDetails, onToggleStatus, onDelete }) {
    const isBlocked = user.status === 'bloqueado'

    return (
        <li className="border-secondary/10 flex items-center gap-3 rounded-2xl border bg-white p-3">
            <Avatar size="sm" name={user.name} />

            <div className="min-w-0 flex-1">
                <p className="text-secondary truncate font-semibold">{user.name}</p>
                <p className="text-secondary/60 truncate text-xs">{user.email}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                    <Badge variant={ROLE_VARIANTS[user.role]}>{ROLE_LABELS[user.role]}</Badge>
                    <Badge variant={STATUS_VARIANTS[user.status]}>
                        {STATUS_LABELS[user.status]}
                    </Badge>
                </div>
            </div>

            <button
                type="button"
                aria-label="Mais informações"
                title="Mais informações"
                onClick={onDetails}
                className="text-secondary rounded-full p-2 transition active:scale-90"
            >
                <Eye className="size-5" />
            </button>
            <button
                type="button"
                aria-label={isBlocked ? 'Desbloquear' : 'Bloquear'}
                title={isBlocked ? 'Desbloquear' : 'Bloquear'}
                onClick={onToggleStatus}
                className="rounded-full p-2 transition active:scale-90"
            >
                {isBlocked ? (
                    <CircleCheck className="size-5 text-green-600" />
                ) : (
                    <Ban className="text-secondary size-5" />
                )}
            </button>
            <button
                type="button"
                aria-label="Excluir"
                title="Excluir"
                onClick={onDelete}
                className="text-danger rounded-full p-2 transition active:scale-90"
            >
                <Trash2 className="size-5" />
            </button>
        </li>
    )
}
