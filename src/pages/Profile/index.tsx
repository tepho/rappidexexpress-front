import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'

import { DeliveryContext } from '../../context/DeliveryContext';
import api from '../../services/api';

import { 
    BaseInput, 
    ChangePasswordButton, 
    Container, 
    ContainerButtons, 
    FormContainer, 
    ProfileImage, 
    SaveButton 
} from "./styles";

const ProfileFormValidationSchema = zod.object({
    name: zod.string().min(5, 'Informe o seu nome.'),
    phone: zod
      .string()
      .min(11, 'Informe o seu numero.')
      .max(11),
    pix: zod.string(),
    profileImage: zod.string(),
    location: zod.string()
  })

  
type ProfileFormData = zod.infer<typeof ProfileFormValidationSchema>

export function Profile(){
    const { token } = useContext(DeliveryContext)
    const navigate = useNavigate()

    const profileFormData = useForm<ProfileFormData>({
        resolver: zodResolver(ProfileFormValidationSchema),
        defaultValues: {
            name: '',
            phone: '',
            pix: '',
            profileImage: '',
            location: '',
        },
    })

    const { handleSubmit, watch, register, setValue } = profileFormData

    function handleSave(data: ProfileFormData) {
        console.log(data)
    }

    function changePassword() {
        navigate('/alterar-senha')
    }

    async function getMyData(){
        try {
            api.defaults.headers.Authorization = `Bearer ${token}`
            const response = await api.get('/user/myself')
            setValue("name", response.data.name)
            setValue("phone", response.data.phone)
            setValue("pix", response.data.pix)
            setValue("profileImage", response.data.profileImage)
            setValue("location", response.data.location)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getMyData()
    }, [])

    const name = watch('name')
    const phone = watch('phone')
    const pix = watch('pix')
    const profileImage = watch('profileImage')
    const location = watch('location')
    const isSubmitDisabled = !name || !phone || !pix || !profileImage || !location || phone.length < 11

    return (
        <Container>
            <form onSubmit={handleSubmit(handleSave)} action="">
                <ProfileImage src={profileImage}  />

                <FormContainer>
                    
                    <label htmlFor="name">Nome:</label>
                    <BaseInput
                        type="text"
                        id="name"
                        placeholder="Informe o seu nome."
                        {...register('name')}
                    />

                    <label htmlFor="phone">Whatsapp:</label>
                    <BaseInput
                        type="text"
                        id="phone"
                        minlength="11"
                        maxlength="11"
                        placeholder="Informe o seu whatsapp."
                        {...register('phone')}
                    />

                    <label htmlFor="pix">Pix:</label>
                    <BaseInput
                        type="text"
                        id="pix"
                        placeholder="Informe o seu pix."
                        {...register('pix')}
                    />

                    <label htmlFor="profileImage">Link da imagem de perfil:</label>
                    <BaseInput
                        type="text"
                        id="profileImage"
                        placeholder="Informe o link da sua imagem."
                        {...register('profileImage')}
                    />

                    <label htmlFor="location">Link do google maps:</label>
                    <BaseInput
                        type="text"
                        id="location"
                        placeholder="Informe o link da localização."
                        {...register('location')}
                    />

                    <ContainerButtons>
                        <SaveButton disabled={isSubmitDisabled} type="submit">Salvar</SaveButton>
                        <ChangePasswordButton onClick={changePassword}>Trocar de senha</ChangePasswordButton>
                    </ContainerButtons>
                </FormContainer>
            </form>
        </Container>
    )
}