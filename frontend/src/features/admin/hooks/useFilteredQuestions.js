// Separa as perguntas dos usuários em pendentes/respondidas, fora da tela.
// Reaproveita o useAdminQuestions (useSuspenseQuery), então suspende junto.

import { useAdminQuestions } from '@/features/admin/hooks/useAdminData'

export function useFilteredQuestions() {
    const { data: questions } = useAdminQuestions()

    return {
        pending: questions.filter((item) => item.status === 'pendente'),
        answered: questions.filter((item) => item.status === 'respondida'),
    }
}
