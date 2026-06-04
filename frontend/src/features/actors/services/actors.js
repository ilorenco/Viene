import { mockActors } from '@/features/actors/mocks/actors'
import { mockDelay } from '@/mocks/delay'

export async function getActors(_category) {
    await mockDelay()
    return mockActors
}
