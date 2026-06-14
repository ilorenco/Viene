import { useState } from 'react'

import { InnovationMap } from '@/features/map/components/InnovationMap'
import { MapActions } from '@/features/map/components/MapActions'
import { UnitSheet } from '@/features/map/components/UnitSheet'
import { mockInnovationUnits } from '@/features/map/mocks/innovationUnits'

export function Map() {
    const [selectedId, setSelectedId] = useState(null)
    const selectedUnit = mockInnovationUnits.find((unit) => unit.id === selectedId)

    // -m-4 cancela o p-4 do <main> (mapa full-bleed) — ver MainLayout.
    return (
        <div className="isolate -m-4 flex flex-1 flex-col">
            <div className="relative flex-1">
                <InnovationMap
                    units={mockInnovationUnits}
                    selectedId={selectedId}
                    onSelectUnit={setSelectedId}
                />
                <MapActions />
            </div>

            <UnitSheet unit={selectedUnit} />
        </div>
    )
}
