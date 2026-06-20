// Informações do item do mapa (ator ou evento) — sem o botão de ação, que fica
// no MapDetailAction. Reutilizado pelo cartão (MapDetailCard) e pela gaveta
// (MapDetailSheet). Mantemos o detalhe enxuto: do ator mostramos só tipo, nome,
// descrição e o ENDEREÇO (os demais dados da planilha existem no mock, mas não
// são exibidos para não sobrecarregar).

import { Clock, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { labelForType } from '@/lib/atorTypes'

export function MapDetailContent({ item, type }) {
    if (type === 'ator') {
        return (
            <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <Badge variant="secondary">{labelForType(item.type)}</Badge>
                </span>
                <h2 className="text-secondary pr-6 text-lg font-extrabold">{item.name}</h2>
                <p className="text-secondary/70 text-sm">{item.description}</p>
                {item.address && (
                    <p className="text-secondary/70 flex items-start gap-1.5 text-sm">
                        <MapPin className="mt-0.5 size-4 shrink-0" />
                        <span className="min-w-0 break-words">
                            {item.address}
                            {item.cep ? ` — ${item.cep}` : ''}
                        </span>
                    </p>
                )}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <Badge variant="primary" className="self-start">
                Evento
            </Badge>
            <h2 className="text-secondary pr-6 text-lg font-extrabold">{item.title}</h2>
            <p className="text-secondary/70 flex items-center gap-1.5 text-sm">
                <Clock className="size-4 shrink-0" />
                {item.datetime}
            </p>
            <p className="text-secondary/70 flex items-center gap-1.5 text-sm">
                <MapPin className="size-4 shrink-0" />
                {item.address}
            </p>
        </div>
    )
}
