// Hook de busca das Perguntas Frequentes (lista pública) no padrão do colega:
// useSuspenseQuery — o loading sobe via <Suspense> e a lista vem já resolvida. O
// service listFaqs já está no estilo mockDelay (e lê a mesma cópia em memória que
// o admin edita).

import { useSuspenseQuery } from '@tanstack/react-query'

import { listFaqs } from '@/features/faq/services/faq'

export function useFaqs() {
    return useSuspenseQuery({ queryKey: ['faqs'], queryFn: listFaqs })
}
