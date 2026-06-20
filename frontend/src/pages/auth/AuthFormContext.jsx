// Contexto compartilhado entre as telas de Login e Cadastro.
//
// Regra de negócio RN_008: ao alternar entre Login e Cadastro, os campos já
// preenchidos NÃO devem ser apagados. Como o AuthLayout continua montado quando
// trocamos entre as duas telas, guardamos os valores aqui e ambas as telas leem
// e escrevem neste mesmo lugar.

import { createContext, useContext, useState } from 'react'

const AuthFormContext = createContext(null)

const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export function AuthFormProvider({ children }) {
    const [values, setValues] = useState(initialValues)

    function setField(name, value) {
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    function reset() {
        setValues(initialValues)
    }

    return (
        <AuthFormContext.Provider value={{ values, setField, reset }}>
            {children}
        </AuthFormContext.Provider>
    )
}

export function useAuthForm() {
    const context = useContext(AuthFormContext)
    if (!context) {
        throw new Error('useAuthForm deve ser usado dentro de <AuthFormProvider>')
    }
    return context
}
