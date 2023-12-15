import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SignIn  } from 'phosphor-react'

import { BaseButton, BaseInput, Container, FormContainer } from "./styles";

const newLoginFormValidationSchema = zod.object({
    user: zod.string().min(5, 'Informe o usuario.'),
    password: zod
      .string()
      .min(4, 'Informe a senha.'),
  })

type NewLoginFormData = zod.infer<typeof newLoginFormValidationSchema>

export function Login() {
    const newLoginFormData = useForm<NewLoginFormData>({
        resolver: zodResolver(newLoginFormValidationSchema),
        defaultValues: {
            user: '',
            password: '',
        },
    })

    const { handleSubmit, watch, reset, register } = newLoginFormData

    function handleLogin(data: NewLoginFormData) {
        console.log(data)
        reset()
    }

    const user = watch('user')
    const password = watch('password')
    const isSubmitDisabled = !user || !password

    return (
        <Container> 
            <form onSubmit={handleSubmit(handleLogin)} action="">
                <FormContainer>
                    <BaseInput
                        type="text"
                        id="user"
                        placeholder="Informe o usuário."
                        {...register('user')}
                    />

                    <BaseInput
                        type="password"
                        id="password"
                        placeholder="Informe a senha."
                        {...register('password')}
                    />
                </FormContainer>

                <BaseButton disabled={isSubmitDisabled} type="submit">
                    <SignIn size={24} /> Login
                </BaseButton>
            </form>
        </Container>
    )
}