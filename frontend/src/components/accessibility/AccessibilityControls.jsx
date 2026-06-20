// Controles de acessibilidade (reutilizados no widget flutuante e em Configurações).

import { Eye, Moon, Sun, Type, Volume2, VolumeX } from 'lucide-react'

import { useAccessibility } from '@/contexts/AccessibilityContext'
import { cn } from '@/lib/utils'

const colorblindOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'protanopia', label: 'Protanopia' },
    { value: 'deuteranopia', label: 'Deuteranopia' },
    { value: 'tritanopia', label: 'Tritanopia' },
]

const fontOptions = [
    { value: 'small', size: 'text-sm', label: 'A menor' },
    { value: 'normal', size: 'text-base', label: 'Padrão' },
    { value: 'large', size: 'text-2xl', label: 'A maior' },
]

function Toggle({ active, onClick, label, icon: Icon }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={onClick}
            className="border-secondary/10 flex w-full items-center justify-between gap-3 rounded-2xl border bg-white p-3 text-left"
        >
            <span className="text-secondary flex items-center gap-2 font-medium">
                <Icon className="text-primary size-5" />
                {label}
            </span>
            <span
                className={cn(
                    'relative h-6 w-11 shrink-0 rounded-full transition',
                    active ? 'bg-primary' : 'bg-secondary/20',
                )}
            >
                <span
                    className={cn(
                        'absolute top-0.5 size-5 rounded-full bg-white shadow transition-all',
                        active ? 'left-[1.375rem]' : 'left-0.5',
                    )}
                />
            </span>
        </button>
    )
}

export function AccessibilityControls() {
    const {
        settings,
        toggleNight,
        toggleHighlight,
        setColorblind,
        setFontScale,
        readPage,
        stopReading,
        isReading,
    } = useAccessibility()

    return (
        <div className="flex flex-col gap-3">
            <Toggle
                active={settings.nightMode}
                onClick={toggleNight}
                label={settings.nightMode ? 'Modo diurno' : 'Modo noturno'}
                icon={settings.nightMode ? Sun : Moon}
            />
            <Toggle
                active={settings.highlight}
                onClick={toggleHighlight}
                label="Realce de palavras"
                icon={Type}
            />

            <div className="border-secondary/10 flex flex-col gap-2 rounded-2xl border bg-white p-3">
                <span className="text-secondary font-medium">Tamanho da fonte</span>
                <div className="flex gap-2">
                    {fontOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setFontScale(option.value)}
                            aria-pressed={settings.fontScale === option.value}
                            aria-label={option.label}
                            className={cn(
                                'flex h-11 flex-1 items-center justify-center rounded-xl leading-none font-bold transition',
                                option.size,
                                settings.fontScale === option.value
                                    ? 'bg-primary text-secondary'
                                    : 'bg-secondary/10 text-secondary',
                            )}
                        >
                            A
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-secondary/10 flex flex-col gap-2 rounded-2xl border bg-white p-3">
                <span className="text-secondary flex items-center gap-2 font-medium">
                    <Eye className="text-primary size-5" />
                    Filtro de daltonismo
                </span>
                <div className="flex flex-wrap gap-2">
                    {colorblindOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setColorblind(option.value)}
                            aria-pressed={settings.colorblind === option.value}
                            className={cn(
                                'rounded-full px-3 py-1 text-sm font-medium transition',
                                settings.colorblind === option.value
                                    ? 'bg-primary text-secondary'
                                    : 'bg-secondary/10 text-secondary',
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={isReading ? stopReading : readPage}
                className="bg-secondary text-background flex items-center justify-center gap-2 rounded-2xl p-3 font-semibold transition active:scale-95"
            >
                {isReading ? (
                    <>
                        <VolumeX className="size-5" />
                        Parar leitura
                    </>
                ) : (
                    <>
                        <Volume2 className="size-5" />
                        Ler a página
                    </>
                )}
            </button>
        </div>
    )
}
