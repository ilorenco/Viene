import { mockActors } from '@/mocks/actors'
import { mockDelay } from '@/mocks/delay'

export async function getActors(_category) {
    await mockDelay()
    return mockActors
}
