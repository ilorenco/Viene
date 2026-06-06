import { mockEvents } from '@/features/events/mocks/events'
import { mockDelay } from '@/mocks/delay'

export async function getEvents(category) {
    await mockDelay()
    if (!category) return mockEvents
    return mockEvents.filter((event) => event.category === category)
}

export async function getEventById(id) {
    await mockDelay()
    return mockEvents.find((event) => event.id === id) ?? null
}
