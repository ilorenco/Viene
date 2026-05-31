import { useState } from 'react'

import { InnovationMap } from '@/components/map/InnovationMap'
import { MapActions } from '@/components/map/MapActions'
import { UnitSheet } from '@/components/map/UnitSheet'
import { mockInnovationUnits } from '@/mocks/innovationUnits'

export function Map() {
    const [selectedId, setSelectedId] = useState(null)
    const selectedUnit = mockInnovationUnits.find((unit) => unit.id === selectedId)

    return (
        <div className="isolate -mx-4 -mb-4 flex flex-1 flex-col">
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
