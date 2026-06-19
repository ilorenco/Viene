// Contexto global de Acessibilidade.
//
// Guarda as preferências do usuário (modo noturno, filtro de daltonismo, realce
// de palavras) e a leitura de página por voz (TTS). As preferências são salvas
// no navegador e aplicadas como atributos no <html>, lidos pelo CSS (index.css).
//
// Recursos pedidos no documento de regras (RNF de acessibilidade):
//   filtro de daltonismo, modo noturno, realce de palavras e leitura de página.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'viene.accessibility'

const defaultSettings = {
    nightMode: false,
    colorblind: 'none',
    highlight: false,
    fontScale: 'normal',
}

const AccessibilityContext = createContext(null)

function loadSettings() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings
    } catch {
        return defaultSettings
    }
}

export function AccessibilityProvider({ children }) {
    const [settings, setSettings] = useState(loadSettings)
    const [isReading, setIsReading] = useState(false)

    // Guarda a leitura (utterance) atual para ignorar eventos de leituras antigas.
    const currentUtteranceRef = useRef(null)

    // Aplica as preferências no <html> e salva no navegador.
    useEffect(() => {
        const root = document.documentElement
        root.dataset.vieneNight = String(settings.nightMode)
        root.dataset.vieneHighlight = String(settings.highlight)
        if (settings.colorblind && settings.colorblind !== 'none') {
            root.dataset.vieneColorblind = settings.colorblind
        } else {
            delete root.dataset.vieneColorblind
        }

        // Tamanho da fonte: escala a raiz (rem), aumentando toda a interface.
        const fontSizes = { small: '14px', normal: '', large: '19px' }
        root.style.fontSize = fontSizes[settings.fontScale] ?? ''

        // Ícone da página (favicon): no modo noturno usa a versão AZUL da marca.
        const favicon = document.querySelector("link[rel='icon']")
        if (favicon) {
            if (settings.nightMode) {
                favicon.href = '/favicon-blue.svg'
                favicon.type = 'image/svg+xml'
            } else {
                favicon.href = '/favicon.svg'
                favicon.type = 'image/svg+xml'
            }
        }

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
        } catch {
            // Ignora se o navegador bloquear o armazenamento.
        }
    }, [settings])

    const toggleNight = useCallback(() => {
        setSettings((prev) => ({ ...prev, nightMode: !prev.nightMode }))
    }, [])

    const toggleHighlight = useCallback(() => {
        setSettings((prev) => ({ ...prev, highlight: !prev.highlight }))
    }, [])

    const setColorblind = useCallback((value) => {
        setSettings((prev) => ({ ...prev, colorblind: value }))
    }, [])

    const setFontScale = useCallback((value) => {
        setSettings((prev) => ({ ...prev, fontScale: value }))
    }, [])

    // Leitura de página: usa a síntese de voz do próprio navegador.
    const readPage = useCallback(() => {
        if (!('speechSynthesis' in window)) return
        window.speechSynthesis.cancel()
        const main = document.querySelector('main') ?? document.body
        const text = main.innerText.trim()
        if (!text) return
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'pt-BR'
        currentUtteranceRef.current = utterance
        // Só reage ao fim/erro se ainda for a leitura atual (evita corridas).
        const finish = () => {
            if (currentUtteranceRef.current !== utterance) return
            currentUtteranceRef.current = null
            setIsReading(false)
        }
        utterance.onend = finish
        utterance.onerror = finish
        window.speechSynthesis.speak(utterance)
        setIsReading(true)
    }, [])

    const stopReading = useCallback(() => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel()
        currentUtteranceRef.current = null
        setIsReading(false)
    }, [])

    // Ao desmontar o provider, interrompe qualquer leitura em andamento.
    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel()
        }
    }, [])

    const value = useMemo(
        () => ({
            settings,
            toggleNight,
            toggleHighlight,
            setColorblind,
            setFontScale,
            readPage,
            stopReading,
            isReading,
        }),
        [
            settings,
            isReading,
            toggleNight,
            toggleHighlight,
            setColorblind,
            setFontScale,
            readPage,
            stopReading,
        ],
    )

    return (
        <AccessibilityContext.Provider value={value}>
            {children}
            <ColorblindFilters />
        </AccessibilityContext.Provider>
    )
}

// Filtros SVG usados pelo "filtro de daltonismo" (referenciados no index.css).
//
// IMPORTANTE: estas são matrizes de CORREÇÃO (daltonização), não de simulação.
// A simulação mostra como um daltônico vê (funde cores) — péssimo para quem TEM
// a deficiência, pois "perde cores". A daltonização faz o contrário: redistribui
// a informação perdida para canais que a pessoa enxerga, deixando as cores mais
// distinguíveis. Cada matriz = I + R·(I − Sim), o algoritmo clássico de daltonize.
//
// `color-interpolation-filters="sRGB"` é obrigatório: sem ele o SVG aplica a
// matriz em linearRGB (padrão), o que desbota/distorce o resultado.
function ColorblindFilters() {
    return (
        <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
            <defs>
                <filter id="viene-protanopia" colorInterpolationFilters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  -0.2549 1.2549 0 0 0  0.3031 -0.5451 1.242 0 0  0 0 0 1 0"
                    />
                </filter>
                <filter id="viene-deuteranopia" colorInterpolationFilters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  -0.4375 1.4375 0 0 0  0.2625 -0.5625 1.3 0 0  0 0 0 1 0"
                    />
                </filter>
                <filter id="viene-tritanopia" colorInterpolationFilters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="1.05 -0.3825 0.3325 0 0  0 1.2345 -0.2345 0 0  0 0 1 0 0  0 0 0 1 0"
                    />
                </filter>
            </defs>
        </svg>
    )
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext)
    if (!context) {
        throw new Error('useAccessibility deve ser usado dentro de <AccessibilityProvider>')
    }
    return context
}
