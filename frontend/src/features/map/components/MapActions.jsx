import { MapPinned, MapPinPlus, MapPinSearch } from 'lucide-react'

const mapActions = [
    { icon: MapPinned, label: 'Explorar' },
    { icon: MapPinSearch, label: 'Buscar' },
    { icon: MapPinPlus, label: 'Contribuir' },
]

export function MapActions() {
    return (
        <div className="absolute inset-x-0 top-0 z-1000 flex justify-center gap-3 px-4 pt-2">
            {mapActions.map(({ icon: Icon, label }) => (
                <button
                    key={label}
                    className="bg-primary font-montserrat flex flex-1 flex-col items-center gap-1 rounded-xl p-2 font-extrabold"
                >
                    <Icon className="size-8" />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    )
}
