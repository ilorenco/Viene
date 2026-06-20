// Simula a latência da rede no modo mock, deixando a experiência parecida com a
// da API real (telas com carregamento/skeleton). Mesmo papel do mocks/delay.js da
// branch do colega — a main usa 1500ms; aqui mantemos 400ms para a navegação
// ficar mais ágil (é só ajustar a constante se quiser ver o skeleton por mais tempo).

const MOCK_DELAY_MS = 400

export const mockDelay = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
