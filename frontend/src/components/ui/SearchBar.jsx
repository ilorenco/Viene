import { Search, X } from 'lucide-react'
import { useRef } from 'react'

export function SearchBar({ value, onChange, placeholder }) {
    const inputRef = useRef(null)

    function clear() {
        onChange('')
        inputRef.current?.focus()
    }

    return (
        <div className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-3">
            <Search aria-hidden="true" className="text-primary size-5 shrink-0" />
            <input
                ref={inputRef}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                aria-label={placeholder}
                className="text-secondary placeholder:text-secondary/50 w-full bg-transparent outline-none"
            />
            {value && (
                <button
                    type="button"
                    onClick={clear}
                    aria-label="Limpar busca"
                    className="text-secondary/50 hover:text-secondary shrink-0 cursor-pointer transition active:scale-90"
                >
                    <X className="size-5" />
                </button>
            )}
        </div>
    )
}
