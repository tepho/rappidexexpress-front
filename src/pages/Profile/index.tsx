import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'

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

    const { handleSubmit, watch, register } = profileFormData

    function handleSave(data: ProfileFormData) {
        console.log(data)
        // navigate('/dashboard')
    }

    function changePassword() {
        console.log('changePass')
    }

    const name = watch('name')
    const phone = watch('phone')
    const pix = watch('pix')
    const profileImage = watch('profileImage')
    const location = watch('location')
    const isSubmitDisabled = !name || !phone || !pix || !profileImage || !location || phone.length < 11

    return (
        <Container>
            <form onSubmit={handleSubmit(handleSave)} action="">
                <ProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg"  />

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
                        minLength="11"
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