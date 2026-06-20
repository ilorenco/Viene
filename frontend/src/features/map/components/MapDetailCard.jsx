// Cartão de detalhe do item selecionado no mapa (DESKTOP). Fica ao lado da lista
// "No mapa" (canto inferior esquerdo) e pode ser ARRASTADO pela tela: segure o
// mouse sobre o cartão (menos nos botões) e mova; solte para fixar. No mobile
// quem mostra é o MapDetailSheet (gaveta).

import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { MapDetailAction } from '@/features/map/components/MapDetailAction'
import { MapDetailContent } from '@/features/map/components/MapDetailContent'
import { cn } from '@/lib/utils'

export function MapDetailCard({ item, type, onClose }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const startRef = useRef(null)

    function onMouseDown(event) {
        // Não arrasta se o clique começou num botão/link (fechar, "ver sobre").
        if (event.target.closest('button, a')) return
        startRef.current = { mx: event.clientX, my: event.clientY, ox: offset.x, oy: offset.y }
        setDragging(true)
    }

    // Enquanto arrasta, acompanha o mouse na janela toda (mesmo saindo do cartão).
    useEffect(() => {
        if (!dragging) return
        function onMove(event) {
            const start = startRef.current
            setOffset({
                x: start.ox + event.clientX - start.mx,
                y: start.oy + event.clientY - start.my,
            })
        }
        function onUp() {
            setDragging(false)
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
        }
    }, [dragging])

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- arrastar é melhoria mouse-only; o card tem fechar + conteúdo acessíveis
        <div
            onMouseDown={onMouseDown}
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
            className={cn(
                'bg-background absolute bottom-3 left-72 z-[1000] hidden w-80 max-w-[22rem] rounded-2xl p-4 shadow-xl select-none lg:block',
                dragging ? 'cursor-grabbing' : 'cursor-grab',
            )}
        >
            <button
                type="button"
                aria-label="Fechar"
                onClick={onClose}
                className="text-secondary absolute top-1.5 right-1.5 p-1.5 transition active:scale-90"
            >
                <X className="size-5" />
            </button>

            <MapDetailContent item={item} type={type} />
            <div className="mt-3">
                <MapDetailAction item={item} type={type} />
            </div>
        </div>
    )
}
