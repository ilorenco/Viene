import useEmblaCarousel from 'embla-carousel-react'

export function useDraggableCarousel() {
    return useEmblaCarousel({ align: 'start', dragFree: true })
}
