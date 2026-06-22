// Hooks de dados do Admin no padrão do colega (React Query + useSuspenseQuery):
// o loading sobe via <Suspense> e a lista vem já resolvida. As mutações
// (excluir/bloquear/moderar/responder) chamam o service e depois invalidam a
// query correspondente (ADMIN_KEYS) para o React Query rebuscar.

import { useSuspenseQuery } from '@tanstack/react-query'

import { getApprovals, listUsers } from '@/features/admin/services/admin'
import { listReports } from '@/features/admin/services/reports'
import { listFaqs } from '@/features/faq/services/faq'
import { listQuestions, QUESTIONS_KEY } from '@/services/questions'

export const ADMIN_KEYS = {
    users: ['admin', 'users'],
    approvals: ['admin', 'approvals'],
    // Lista de TODAS as perguntas (admin) — diferente de MY_QUESTIONS_KEY do
    // Perfil, que é só as perguntas do usuário logado.
    questions: QUESTIONS_KEY,
    faqs: ['admin', 'faqs'],
    reports: ['admin', 'reports'],
}

export function useAdminUsers() {
    return useSuspenseQuery({ queryKey: ADMIN_KEYS.users, queryFn: listUsers })
}

export function useAdminApprovals() {
    return useSuspenseQuery({ queryKey: ADMIN_KEYS.approvals, queryFn: getApprovals })
}

export function useAdminQuestions() {
    return useSuspenseQuery({ queryKey: ADMIN_KEYS.questions, queryFn: listQuestions })
}

export function useAdminFaqs() {
    return useSuspenseQuery({ queryKey: ADMIN_KEYS.faqs, queryFn: listFaqs })
}

export function useAdminReports() {
    return useSuspenseQuery({ queryKey: ADMIN_KEYS.reports, queryFn: listReports })
}
