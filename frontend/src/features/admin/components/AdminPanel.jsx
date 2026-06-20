// Aba "Painel" do admin: cards de resumo + 2 gráficos (barras: atores por área;
// linha: atores por ano de fundação) + tabela por área. Os dados vêm dos hooks
// (useActors/useEvents/useAdminUsers/useAdminApprovals) e a REGRA das estatísticas
// fica em lib/adminStats.js — o componente só orquestra e desenha (gráficos SVG/CSS
// na mão, sem dependência de biblioteca de gráficos).

import { Building2, CalendarDays, Clock, Users } from 'lucide-react'
import { useMemo } from 'react'

import { useActors } from '@/features/actors/hooks/useActors'
import { useAdminApprovals, useAdminUsers } from '@/features/admin/hooks/useAdminData'
import { useEvents } from '@/features/events/hooks/useEvents'
import { getAreaStats, getFoundedCounts } from '@/lib/adminStats'
import { cn } from '@/lib/utils'

// Gráfico de BARRAS: atores por área (altura proporcional, cor da área no mapa).
function AreaBarChart({ areaStats }) {
    const max = Math.max(...areaStats.map((area) => area.count), 1)
    return (
        <div className="flex h-52 items-end gap-3">
            {areaStats.map((area) => (
                <div
                    key={area.id}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                >
                    <span className="text-secondary text-xs font-bold">{area.count}</span>
                    <div
                        className="w-full rounded-t-md transition-all"
                        style={{
                            height: `${Math.max((area.count / max) * 100, 3)}%`,
                            backgroundColor: area.color,
                        }}
                    />
                    <span className="text-secondary/60 mt-1 text-center text-[10px] leading-tight">
                        {area.short}
                    </span>
                </div>
            ))}
        </div>
    )
}

// Gráfico de LINHA: nº de atores por ano de fundação.
function FoundedLineChart({ foundedCounts }) {
    if (foundedCounts.length < 2) return null

    const width = 320
    const height = 180
    const pad = 26
    const years = foundedCounts.map((point) => point.year)
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)
    const maxCount = Math.max(...foundedCounts.map((point) => point.count), 1)

    const xFor = (year) => pad + ((year - minYear) / (maxYear - minYear || 1)) * (width - pad * 2)
    const yFor = (count) => height - pad - (count / maxCount) * (height - pad * 2)
    const points = foundedCounts
        .map((point) => `${xFor(point.year)},${yFor(point.count)}`)
        .join(' ')

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-44 w-full"
            role="img"
            aria-label="Atores por ano de fundação"
        >
            {/* eixo de base */}
            <line
                x1={pad}
                y1={height - pad}
                x2={width - pad}
                y2={height - pad}
                stroke="currentColor"
                className="text-secondary/15"
            />
            <polyline fill="none" stroke="#f48634" strokeWidth="2.5" points={points} />
            {foundedCounts.map((point) => (
                <circle
                    key={point.year}
                    cx={xFor(point.year)}
                    cy={yFor(point.count)}
                    r="3"
                    fill="#f48634"
                />
            ))}
            <text x={pad} y={height - 8} className="text-secondary/50 fill-current text-[9px]">
                {minYear}
            </text>
            <text
                x={width - pad}
                y={height - 8}
                textAnchor="end"
                className="text-secondary/50 fill-current text-[9px]"
            >
                {maxYear}
            </text>
            <text x={pad} y={14} className="text-secondary/50 fill-current text-[9px]">
                máx. {maxCount}/ano
            </text>
        </svg>
    )
}

// TABELA: instituições por área.
function AreaTable({ areaStats }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-sm">
                <thead>
                    <tr className="text-secondary/60 border-secondary/10 border-b text-xs">
                        <th className="py-2 pr-3 font-semibold">Área</th>
                        <th className="py-2 pr-3 font-semibold">Atores</th>
                        <th className="py-2 pr-3 font-semibold">Tags distintas</th>
                        <th className="py-2 font-semibold">Tag mais comum</th>
                    </tr>
                </thead>
                <tbody>
                    {areaStats.map((area) => (
                        <tr key={area.id} className="border-secondary/5 border-b last:border-0">
                            <td className="py-2 pr-3">
                                <span className="flex items-center gap-2">
                                    <span
                                        className="size-2.5 shrink-0 rounded-full"
                                        style={{ backgroundColor: area.color }}
                                    />
                                    <span className="text-secondary font-medium">{area.label}</span>
                                </span>
                            </td>
                            <td className="text-secondary py-2 pr-3 font-bold">{area.count}</td>
                            <td className="text-secondary/80 py-2 pr-3">{area.distinctTags}</td>
                            <td className="text-secondary/80 py-2">{area.topTag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function Panel({ title, children }) {
    return (
        <div className="border-secondary/10 flex flex-col gap-3 rounded-2xl border bg-white p-4">
            <h3 className="font-montserrat text-secondary text-sm font-extrabold">{title}</h3>
            {children}
        </div>
    )
}

export function AdminPanel({ onNavigateTab }) {
    // Contagens ao vivo (refletem exclusões/moderações da sessão) e os atores/eventos
    // para os gráficos vêm dos hooks (useSuspenseQuery). As estatísticas derivadas
    // ficam em lib/adminStats.js.
    const { data: users } = useAdminUsers()
    const { data: approvals } = useAdminApprovals()
    const actors = useActors()
    const events = useEvents()

    const areaStats = useMemo(() => getAreaStats(actors), [actors])
    const foundedCounts = useMemo(() => getFoundedCounts(actors), [actors])

    const cards = [
        {
            key: 'pending',
            label: 'Aprovações pendentes',
            value: approvals.filter((item) => !item.reviewed).length,
            icon: Clock,
            highlight: true,
            toApprovals: true,
        },
        { key: 'users', label: 'Usuários cadastrados', value: users.length, icon: Users },
        { key: 'events', label: 'Eventos totais', value: events.length, icon: CalendarDays },
        { key: 'actors', label: 'Atores totais', value: actors.length, icon: Building2 },
    ]

    return (
        <section className="flex flex-col gap-6">
            <div>
                <h2 className="font-montserrat text-secondary text-xl font-extrabold">
                    Olá, Administrador
                </h2>
                <p className="text-secondary/60 text-sm">Resumo geral da plataforma VIENE.</p>
            </div>

            {/* Cards de resumo. O de pendentes leva para a aba Aprovações. */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {cards.map(({ key, label, value, icon: Icon, highlight, toApprovals }) => {
                    const className = cn(
                        'flex flex-col gap-1 rounded-2xl p-3 text-left transition',
                        highlight
                            ? 'bg-primary text-secondary'
                            : 'border-secondary/10 text-secondary border bg-white',
                        toApprovals && 'cursor-pointer active:scale-95',
                    )
                    const content = (
                        <>
                            {/* Número ao lado do ícone (deixa o card mais baixo). */}
                            <div className="flex items-center gap-2.5">
                                <Icon
                                    className={cn(
                                        'size-6 shrink-0',
                                        highlight ? 'text-secondary' : 'text-primary',
                                    )}
                                />
                                <span className="font-montserrat text-2xl font-extrabold">
                                    {value}
                                </span>
                            </div>
                            <span className="text-xs font-medium">{label}</span>
                        </>
                    )
                    return toApprovals ? (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onNavigateTab?.('aprovacoes')}
                            className={className}
                        >
                            {content}
                        </button>
                    ) : (
                        <div key={key} className={className}>
                            {content}
                        </div>
                    )
                })}
            </div>

            {/* Gráficos */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Panel title="Atores por área">
                    <AreaBarChart areaStats={areaStats} />
                </Panel>
                <Panel title="Atores por ano de fundação">
                    <FoundedLineChart foundedCounts={foundedCounts} />
                </Panel>
            </div>

            {/* Tabela por área */}
            <Panel title="Instituições por área">
                <AreaTable areaStats={areaStats} />
            </Panel>
        </section>
    )
}
