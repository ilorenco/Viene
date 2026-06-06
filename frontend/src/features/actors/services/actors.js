import { mockActors } from '@/features/actors/mocks/actors'
import { mockDelay } from '@/mocks/delay'

export async function getActors(category) {
    await mockDelay()
    if (!category) return mockActors
    return mockActors.filter((actor) => actor.category === category)
}
