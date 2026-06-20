// Busca do mapa: ao enviar, filtra os pinos do mapa E a lista pelos atores/
// eventos relacionados à palavra-chave.

import { Search } from 'lucide-react'

export function MapSearch({ value, onChange, onSubmit }) {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                onSubmit()
            }}
            className="flex items-center gap-2"
        >
            <div className="border-secondary/20 flex flex-1 items-center gap-2 rounded-full border px-3 py-1.5">
                <Search className="text-secondary/50 size-4 shrink-0" />
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="Buscar atores e eventos..."
                    className="text-secondary placeholder:text-secondary/50 w-full bg-transparent text-sm outline-none"
                />
            </div>
            <button
                type="submit"
                className="bg-primary text-secondary shrink-0 rounded-full px-3 py-1.5 text-sm font-bold transition active:scale-95"
            >
                Buscar
            </button>
        </form>
    )
}
