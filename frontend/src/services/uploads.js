// Serviço de upload de imagem (foto de perfil, Ator, Evento).
//
// Conectado à API real (ver UploadController, prefixo /uploads):
//   POST /uploads -> multipart/form-data, devolve {url}

import { request } from '@/services/http'

export async function uploadImage(file) {
    const formData = new FormData()
    formData.append('file', file)
    return request('/uploads', { method: 'POST', body: formData })
}
