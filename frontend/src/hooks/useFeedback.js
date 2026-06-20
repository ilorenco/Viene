// Hook de mensagem transitoria (feedback) com auto-dispensa.
// Mostra um aviso curto (ex: "Aprovado: ...") que some sozinho apos alguns
// segundos. Usa a mesma assinatura de useState ([valor, setar]) para substituir
// um const [feedback, setFeedback] = useState('') sem mudar o resto do codigo.

import { useEffect, useRef, useState } from 'react'

export function useFeedback() {
    const [feedback, setFeedbackState] = useState('')
    const timerRef = useRef(null)

    // Define a mensagem e agenda a auto-dispensa apos 3,5s.
    // Sempre limpa um timer anterior para reiniciar a contagem a cada novo aviso.
    function setFeedback(message) {
        setFeedbackState(message)
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        if (message) {
            timerRef.current = setTimeout(() => setFeedbackState(''), 3500)
        }
    }

    // Limpa o timer pendente quando o componente e desmontado.
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    return [feedback, setFeedback]
}
