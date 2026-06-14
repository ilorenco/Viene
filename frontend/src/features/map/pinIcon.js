import L from 'leaflet'

export function createPinIcon(selected = false) {
    const color = selected ? 'var(--color-secondary, #282828)' : 'var(--color-primary, #f48634)'
    const size = selected ? 42 : 34

    return L.divIcon({
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        html: `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"
                xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,.35))">
                <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7z" />
                <circle cx="12" cy="9" r="2.6" fill="#fff" />
            </svg>
        `,
    })
}
