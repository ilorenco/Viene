// Filtro derivado das Perguntas Frequentes — mesma ideia do useFilteredActors:
// a busca de dados continua no useFaqs (useSuspenseQuery) e este hook só aplica,
// em memória, o filtro por PÁGINA (category) e o termo de busca. A página recebe
// a lista já pronta e não precisa saber de onde os dados vieram.

import { useMemo } from 'react'

import { useFaqs } from '@/features/faq/hooks/useFaqs'

export function useFilteredFaqs(category, search) {
    const { data: faqs } = useFaqs()

    return useMemo(() => {
        const term = search.trim().toLowerCase()

        const items = faqs.filter((faq) => {
            const matchCategory = category === 'todas' || faq.category === category
            const matchSearch =
                !term ||
                faq.question.toLowerCase().includes(term) ||
                faq.answer.toLowerCase().includes(term)
            return matchCategory && matchSearch
        })

        return { items }
    }, [faqs, category, search])
}
