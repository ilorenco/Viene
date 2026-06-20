// Controles de acessibilidade (reutilizados no widget flutuante e em Configurações).
//
// `compact` (usado em Configurações): no DESKTOP os toggles ficam à esquerda (~70%)
// e, à direita (~30%), o tamanho da fonte com o botão "Ler a página" logo abaixo,
// ocupando a mesma largura. No MOBILE tudo fica empilhado (fonte abaixo do Realce
// e o leitor abaixo da fonte). O widget (padrão) mantém o layout empilhado simples.

import { Eye, Moon, Sun, Type, Volume2, VolumeX } from 'lucide-react'

import { useAccessibility } from '@/features/accessibility/AccessibilityContext'
import { cn } from '@/lib/utils'

const colorblindOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'protanopia', label: 'Protanopia' },
    { value: 'deuteranopia', label: 'Deuteranopia' },
    { value: 'tritanopia', label: 'Tritanopia' },
]

const fontOptions = [
    { value: 'small', size: 'text-sm', compactSize: 'text-sm', label: 'A menor' },
    { value: 'normal', size: 'text-base', compactSize: 'text-base', label: 'Padrão' },
    { value: 'large', size: 'text-2xl', compactSize: 'text-xl', label: 'A maior' },
]

function Toggle({ active, onClick, label, icon: Icon, compact }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={active}
            onClick={onClick}
            className={cn(
                'border-secondary/10 flex w-full items-center justify-between rounded-2xl border bg-white p-3 text-left',
                compact ? 'gap-2' : 'gap-3',
            )}
        >
            <span
                className={cn(
                    'text-secondary flex items-center gap-2 font-medium',
                    compact && 'text-sm',
                )}
            >
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

export function AccessibilityControls({ compact = false }) {
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

    const nightToggle = (
        <Toggle
            compact={compact}
            active={settings.nightMode}
            onClick={toggleNight}
            label={settings.nightMode ? 'Modo diurno' : 'Modo noturno'}
            icon={settings.nightMode ? Sun : Moon}
        />
    )

    const highlightToggle = (
        <Toggle
            compact={compact}
            active={settings.highlight}
            onClick={toggleHighlight}
            label="Realce de palavras"
            icon={Type}
        />
    )

    const fontBlock = (
        <div className="border-secondary/10 flex flex-col justify-center gap-2 rounded-2xl border bg-white p-3">
            <span className={cn('text-secondary font-medium', compact && 'text-sm')}>
                {compact ? 'Fonte' : 'Tamanho da fonte'}
            </span>
            <div className="flex gap-2">
                {fontOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setFontScale(option.value)}
                        aria-pressed={settings.fontScale === option.value}
                        aria-label={option.label}
                        className={cn(
                            'flex flex-1 items-center justify-center rounded-xl leading-none font-bold transition',
                            compact ? 'h-10' : 'h-11',
                            compact ? option.compactSize : option.size,
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
    )

    const daltonismBlock = (
        <div className="border-secondary/10 flex flex-col gap-2 rounded-2xl border bg-white p-3">
            <span className="text-secondary flex items-center gap-2 font-medium">
                <Eye className="text-primary size-5" />
                Filtro de daltonismo
            </span>
            <div
                className={cn(
                    'gap-2',
                    compact ? 'grid grid-cols-2 sm:grid-cols-4' : 'flex flex-wrap',
                )}
            >
                {colorblindOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setColorblind(option.value)}
                        aria-pressed={settings.colorblind === option.value}
                        className={cn(
                            'rounded-full font-medium transition',
                            compact ? 'px-3 py-2 text-sm' : 'px-3 py-1 text-sm',
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
    )

    const readingButton = (
        <button
            type="button"
            onClick={isReading ? stopReading : readPage}
            className={cn(
                'flex items-center justify-center gap-2 rounded-2xl p-3 font-semibold transition active:scale-95',
                // No modo compacto a seção tem fundo escuro, então o botão usa o
                // laranja da marca para se destacar (o secundário sumiria no fundo).
                compact ? 'bg-primary text-secondary' : 'bg-secondary text-background',
            )}
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
    )

    return (
        <div className="flex flex-col gap-3">
            {compact ? (
                <>
                    {/* Desktop: toggles (70%) à esquerda; fonte + leitor (30%) à direita.
                        Mobile: empilhado (toggles, fonte, leitor). */}
                    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[7fr_3fr]">
                        <div className="flex flex-col gap-3">
                            {nightToggle}
                            {highlightToggle}
                        </div>
                        <div className="flex flex-col gap-3">
                            {fontBlock}
                            {readingButton}
                        </div>
                    </div>
                    {daltonismBlock}
                </>
            ) : (
                <>
                    {nightToggle}
                    {highlightToggle}
                    {fontBlock}
                    {daltonismBlock}
                    {readingButton}
                </>
            )}
        </div>
    )
}
