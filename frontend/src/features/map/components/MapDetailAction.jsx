// Botão de ação do detalhe, na cor do tipo do item. Fica separado do conteúdo
// para poder ser FIXADO no rodapé da gaveta do mobile (sempre visível) e abaixo
// das infos no card. Para o ator, leva à PÁGINA do ator (/actors/:id) — onde estão
// os contatos/site; para o evento, à página do evento (/events/:id).

import { Link } from 'react-router-dom'

import { EVENT_COLOR } from '@/features/map/components/InnovationMap'

export function MapDetailAction({ item, type }) {
    if (type === 'ator') {
        return (
            <Link
                to={`/actors/${item.id}`}
                style={{ backgroundColor: item.color }}
                className="text-secondary block rounded-full px-4 py-2 text-center text-sm font-bold transition active:scale-95"
            >
                Ver página do ator
            </Link>
        )
    }

    return (
        <Link
            to={`/events/${item.id}`}
            style={{ backgroundColor: EVENT_COLOR }}
            className="block rounded-full px-4 py-2 text-center text-sm font-bold text-white transition active:scale-95"
        >
            Ver evento
        </Link>
    )
}
