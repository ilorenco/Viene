import { mockEvents } from '@/features/events/mocks/events'
import { mockDelay } from '@/mocks/delay'

export async function getEvents(_category) {
    await mockDelay()
    return mockEvents
}

export async function getEventById(id) {
    await mockDelay()
    return mockEvents.find((event) => event.id === id) ?? null
}
