// Perguntas do usuário (seção "Minhas perguntas" do Perfil), no padrão do colega:
// useSuspenseQuery — o loading sobe via <Suspense> e a lista vem já resolvida. O
// service listQuestions é compartilhado (src/services/questions.js).

import { useSuspenseQuery } from '@tanstack/react-query'

import { listQuestions, QUESTIONS_KEY } from '@/services/questions'

export function useMyQuestions() {
    return useSuspenseQuery({ queryKey: QUESTIONS_KEY, queryFn: listQuestions }).data
}
