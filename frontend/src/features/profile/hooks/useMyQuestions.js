// Perguntas do usuário (seção "Minhas perguntas" do Perfil), no padrão do colega:
// useSuspenseQuery — o loading sobe via <Suspense> e a lista vem já resolvida.
//
// Usa listMyQuestions (GET /ajuda/perguntas, escopado ao usuário logado) — NÃO
// é a mesma lista do admin (listQuestions/GET /admin/perguntas, todas as
// perguntas de todo mundo). Query key própria (MY_QUESTIONS_KEY), separada da
// do admin, pra não misturar os dois caches.

import { useSuspenseQuery } from '@tanstack/react-query'

import { listMyQuestions, MY_QUESTIONS_KEY } from '@/services/questions'

export function useMyQuestions() {
    return useSuspenseQuery({ queryKey: MY_QUESTIONS_KEY, queryFn: listMyQuestions }).data
}
