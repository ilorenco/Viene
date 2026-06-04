const MOCK_DELAY_MS = 1500

export const mockDelay = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
