// "Minhas publicações" do Perfil de ator (atores e eventos sob a responsabilidade
// do usuário), no padrão do colega: useSuspenseQuery — o loading sobe via
// <Suspense> e os dados vêm já resolvidos. O service é compartilhado.

import { useSuspenseQuery } from '@tanstack/react-query'

import { listMyPublications, MY_PUBLICATIONS_KEY } from '@/features/profile/services/publications'

export function useMyPublications() {
    return useSuspenseQuery({ queryKey: MY_PUBLICATIONS_KEY, queryFn: listMyPublications }).data
}
