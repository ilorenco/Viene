// Especificação MÓVEL do item selecionado no mapa (mobile). Quando o usuário
// clica num marcador, esta gaveta sobe pela parte de baixo mostrando as infos e,
// FIXO no rodapé, o botão de ação (sempre visível, mesmo sem rolar/expandir).
// Pode ser PUXADA para cima (alça) para ver a descrição completa. Some no desktop.

import { X } from 'lucide-react'
import { useRef, useState } from 'react'

import { MapDetailAction } from '@/features/map/components/MapDetailAction'
import { MapDetailContent } from '@/features/map/components/MapDetailContent'
import { cn } from '@/lib/utils'

export function MapDetailSheet({ item, type, onClose }) {
    const [expanded, setExpanded] = useState(false)
    const startRef = useRef(null)

    function onPointerDown(event) {
        startRef.current = event.clientY
    }

    // Puxar para cima expande; puxar para baixo recolhe (e, se já estiver
    // recolhida, fecha). Um toque simples alterna entre os dois estados.
    function onPointerUp(event) {
        if (startRef.current == null) return
        const delta = startRef.current - event.clientY
        if (delta > 24) setExpanded(true)
        else if (delta < -24) expanded ? setExpanded(false) : onClose()
        else setExpanded((value) => !value)
        startRef.current = null
    }

    return (
        <div
            className={cn(
                'bg-background absolute inset-x-0 bottom-0 z-[1001] flex flex-col rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] transition-[height] duration-300 lg:hidden',
                expanded ? 'h-[65vh]' : 'h-52',
            )}
        >
            <button
                type="button"
                aria-expanded={expanded}
                aria-label="Detalhes — puxe para cima para ver tudo"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                className="flex shrink-0 cursor-grab touch-none flex-col items-center py-2 select-none"
            >
                <span className="bg-secondary/30 h-1.5 w-12 rounded-full" />
            </button>

            <button
                type="button"
                aria-label="Fechar"
                onClick={onClose}
                className="text-secondary absolute top-1.5 right-1.5 p-1.5 transition active:scale-90"
            >
                <X className="size-5" />
            </button>

            {/* Informações rolam; o botão fica FIXO no rodapé (sempre visível). */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4">
                <MapDetailContent item={item} type={type} />
            </div>
            <div className="border-secondary/10 shrink-0 border-t px-4 py-3">
                <MapDetailAction item={item} type={type} />
            </div>
        </div>
    )
}
