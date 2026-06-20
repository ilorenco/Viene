// Botão de ação do detalhe, na cor do tipo do item. Fica separado do conteúdo
// para poder ser FIXADO no rodapé da gaveta do mobile (sempre visível) e abaixo
// das infos no card. Para o ator, abre o SITE oficial (da planilha); se não tiver
// site, leva ao catálogo. Para o evento, abre a página do evento.

import { Link } from 'react-router-dom'

import { EVENT_COLOR } from '@/features/map/components/InnovationMap'

export function MapDetailAction({ item, type }) {
    if (type === 'ator') {
        const className =
            'text-secondary block rounded-full px-4 py-2 text-center text-sm font-bold transition active:scale-95'

        if (item.website) {
            return (
                <a
                    href={`https://${item.website}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: item.color }}
                    className={className}
                >
                    Visitar site da instituição
                </a>
            )
        }

        return (
            <Link to="/actors" style={{ backgroundColor: item.color }} className={className}>
                Ver sobre a instituição
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
