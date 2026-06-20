// Mutação "sugerir ponto no mapa" (Solicitar marcador), no padrão do colega:
// useMutation chama o service e o componente usa isPending/isSuccess em vez de
// estado manual. RN_003: a sugestão entra como pendente (moderação) e ainda NÃO
// reflete no mapa — quando refletir, adicionar
// onSuccess: queryClient.invalidateQueries(['map','actors'] / ['map','events']).

import { useMutation } from '@tanstack/react-query'

import { suggestPoint } from '@/features/map/services/map'

export function useSuggestPoint() {
    return useMutation({ mutationFn: suggestPoint })
}
