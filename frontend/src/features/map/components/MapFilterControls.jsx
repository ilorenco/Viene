// Conteúdo dos filtros do mapa (camadas Atores/Eventos + categorias + sugerir).
// Reutilizado no painel do desktop e na gaveta do mobile.

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { mockEventCategories } from '@/features/events/mocks/eventCategories'
import { EVENT_COLOR } from '@/features/map/components/InnovationMap'
import { MapEventDateFilter } from '@/features/map/components/MapEventDateFilter'
import { ATOR_AREAS } from '@/lib/atorTypes'
import { cn } from '@/lib/utils'

function Switch({ checked, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label ? `Mostrar ${label}` : undefined}
            onClick={onChange}
            className={cn(
                'relative h-5 w-9 shrink-0 rounded-full transition',
                checked ? 'bg-primary' : 'bg-secondary/25',
            )}
        >
            <span
                className={cn(
                    'absolute top-0.5 size-4 rounded-full bg-white transition-all',
                    checked ? 'left-[1.125rem]' : 'left-0.5',
                )}
            />
        </button>
    )
}

function LayerSection({ title, enabled, onToggle, children }) {
    const [open, setOpen] = useState(true)
    return (
        <section className="border-secondary/10 rounded-xl border">
            <div className="flex items-center gap-2 p-2">
                <Switch checked={enabled} onChange={onToggle} label={title} />
                <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    className="text-secondary flex flex-1 items-center justify-between text-sm font-semibold"
                >
                    {title}
                    <ChevronDown
                        className={cn('size-4 transition-transform', open && 'rotate-180')}
                    />
                </button>
            </div>
            {open && (
                <div
                    className={cn(
                        'flex flex-col gap-3 px-2 pb-2 lg:gap-2',
                        !enabled && 'pointer-events-none opacity-40',
                    )}
                >
                    {children}
                </div>
            )}
        </section>
    )
}

export function MapFilterControls({
    showActors,
    setShowActors,
    showEvents,
    setShowEvents,
    enabledTypes,
    setEnabledTypes,
    enabledCats,
    setEnabledCats,
    events,
    eventRange,
    setEventRange,
    hidePins,
    onTogglePins,
}) {
    function toggleType(id) {
        setEnabledTypes((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    // Liga/desliga de uma só vez todos os tipos de um setor (área).
    function toggleArea(area) {
        setEnabledTypes((prev) => {
            const next = new Set(prev)
            const allOn = area.types.every((type) => next.has(type.id))
            area.types.forEach((type) => {
                if (allOn) next.delete(type.id)
                else next.add(type.id)
            })
            return next
        })
    }

    function toggleCat(value) {
        setEnabledCats((prev) => {
            const next = new Set(prev)
            if (next.has(value)) next.delete(value)
            else next.add(value)
            return next
        })
    }

    return (
        <div className="flex flex-col gap-3">
            {/* Visibilidade geral dos marcadores (mesmo efeito do botão de olho
                no mapa) — antes só existia no desktop atrás dos controles de zoom. */}
            <div className="border-secondary/10 flex items-center gap-2 rounded-xl border p-2">
                <Switch checked={!hidePins} onChange={onTogglePins} label="marcadores no mapa" />
                <span className="text-secondary flex-1 text-sm font-semibold">
                    Marcadores no mapa
                </span>
            </div>

            <LayerSection
                title="Atores"
                enabled={showActors}
                onToggle={() => setShowActors(!showActors)}
            >
                {ATOR_AREAS.map((area) => {
                    const allOn = area.types.every((type) => enabledTypes.has(type.id))
                    const someOn = area.types.some((type) => enabledTypes.has(type.id))
                    return (
                        <div key={area.id} className="flex flex-col gap-2 lg:gap-1">
                            {/* Check do setor: marca/desmarca todos os tipos da área.
                                Fica "parcial" (indeterminate) quando só alguns estão. */}
                            <label className="text-secondary/80 flex items-center gap-1.5 text-xs font-bold">
                                <input
                                    type="checkbox"
                                    className="accent-primary size-5 lg:size-4"
                                    checked={allOn}
                                    ref={(el) => {
                                        if (el) el.indeterminate = someOn && !allOn
                                    }}
                                    onChange={() => toggleArea(area)}
                                />
                                <span
                                    className="size-2.5 rounded-full"
                                    style={{ backgroundColor: area.color }}
                                />
                                {area.label}
                            </label>
                            {area.types.map((type) => (
                                <label
                                    key={type.id}
                                    className="text-secondary flex items-center gap-2 py-1 pl-6 text-sm lg:py-0"
                                >
                                    <input
                                        type="checkbox"
                                        className="accent-primary size-5 lg:size-4"
                                        checked={enabledTypes.has(type.id)}
                                        onChange={() => toggleType(type.id)}
                                    />
                                    {type.label}
                                </label>
                            ))}
                        </div>
                    )
                })}
            </LayerSection>

            <LayerSection
                title="Eventos"
                enabled={showEvents}
                onToggle={() => setShowEvents(!showEvents)}
            >
                {/* Filtro por data: calendário (um dia) + "em até X dias". */}
                <MapEventDateFilter events={events} value={eventRange} onChange={setEventRange} />

                <span className="text-secondary/70 flex items-center gap-1.5 text-xs font-bold">
                    <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: EVENT_COLOR }}
                    />
                    Categorias de eventos
                </span>
                {mockEventCategories.map((category) => (
                    <label
                        key={category.value}
                        className="text-secondary flex items-center gap-2 py-1 pl-4 text-sm lg:py-0"
                    >
                        <input
                            type="checkbox"
                            className="accent-primary size-5 lg:size-4"
                            checked={enabledCats.has(category.value)}
                            onChange={() => toggleCat(category.value)}
                        />
                        {category.label}
                    </label>
                ))}
            </LayerSection>
        </div>
    )
}
