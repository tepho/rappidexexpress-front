import { useContext, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom';
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SignIn  } from 'phosphor-react'

import { DeliveryContext } from '../../context/DeliveryContext';
import { BaseButton, BaseInput, Container, FormContainer } from "./styles";
import { Loader } from '../../components/Loader';

import api from '../../services/api';

const newLoginFormValidationSchema = zod.object({
    user: zod.string().min(3,'Informe o usuario.'),
    password: zod
      .string()
      .min(4, 'Informe a senha.'),
  })

type NewLoginFormData = zod.infer<typeof newLoginFormValidationSchema>

export function Login() {
    const { login } = useContext(DeliveryContext)
    const navigate = useNavigate()
    const newLoginFormData = useForm<NewLoginFormData>({
        resolver: zodResolver(newLoginFormValidationSchema),
        defaultValues: {
            user: '',
            password: '',
        },
    })

    const [loading, setLoading] = useState(false)

    const { handleSubmit, watch, reset, register } = newLoginFormData

    async function handleLogin(data: NewLoginFormData) {
        if(loading) {
            return
        }

        setLoading(true)
        try {
            const reponse = await api.post('/auth', data)
            login(reponse.data.token, reponse.data.permission)
            reset()
            navigate('/')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error.response.data.message)
        }
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
                    { !loading ?
                        <>
                            <SignIn size={24} /> Login 
                        </> :
                        <Loader size={20} biggestColor='black' smallestColor='green' />
                    }
                </BaseButton>
            </form>
        </Container>
    )
}