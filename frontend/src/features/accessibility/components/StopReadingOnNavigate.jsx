// Interrompe a leitura de página (TTS) sempre que a rota muda.
//
// Sem isto, a síntese de voz continuaria lendo o texto da página anterior
// depois de navegar. Não renderiza nada na tela.

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAccessibility } from '@/features/accessibility/AccessibilityContext'

export function StopReadingOnNavigate() {
    const { pathname } = useLocation()
    const { stopReading } = useAccessibility()

    useEffect(() => {
        stopReading()
    }, [pathname, stopReading])

    return null
}
