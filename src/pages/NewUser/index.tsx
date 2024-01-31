import { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'

import { DeliveryContext } from '../../context/DeliveryContext';
import api from '../../services/api';
import { 
    BaseInput,
    Container,
    ContainerButtons,
    FormContainer,
    BaseButton
} from "./styles";
import { Loader } from '../../components/Loader';

const ProfileFormValidationSchema = zod.object({
    name: zod.string().min(5, 'Informe o seu nome.'),
    phone: zod
      .string()
      .min(11, 'Informe o seu numero.')
      .max(11),
    user: zod.string(),
    password: zod.string(),
    pix: zod.string(),
    profileImage: zod.string(),
    location: zod.string()
  })

  
type ProfileFormData = zod.infer<typeof ProfileFormValidationSchema>

export function NewUser(){
    const { token } = useContext(DeliveryContext)
    api.defaults.headers.Authorization = `Bearer ${token}`

    const { user } = useParams();

    console.log(user);

    const [userId, setUserId] = useState()
    const [formValues, setFormValues] = useState({
        name: '',
        phone: '',
        user: '',
        password: '',
        pix: '',
        profileImage: '',
        location: '',
    })

    const [loading, setLoading] = useState(false)
    const [selectedType, setSelectedType] = useState('')
    const profileFormData = useForm<ProfileFormData>({
        resolver: zodResolver(ProfileFormValidationSchema),
        values: formValues,
    })

    const { handleSubmit, watch, register, reset } = profileFormData

    async function handleCreate(data: ProfileFormData) {
        if(loading){
            return
        }

        console.log(selectedType)

        setLoading(true)
        try {
            await api.post('/user', {
                ...data,
                type: selectedType,
                permission: selectedType === 'admin' ? selectedType : 'none',
            })
            reset()
            setLoading(false)
            alert("Novo usuário criado com sucesso!")
        } catch (error) {
            setLoading(false)
            alert(error.response.data.message)
        }
        console.log(data)
        // navigate('/dashboard')
    }

    async function handleSave(data: ProfileFormData){
        console.log(data)
        if(loading){
            return
        }

        console.log(selectedType)

        setLoading(true)

        const { name, phone, user, pix, profileImage, location } = data;
        try {
            await api.put(`/user/${userId}`, {
                name,
                phone,
                user,
                pix,
                profileImage,
                location
            })
            setLoading(false)
            alert("Usuário editado com sucesso!")
        } catch (error) {
            setLoading(false)
            alert(error.response.data.message)
        }
        console.log(data)
        // navigate('/dashboard')
    }

    async function submitForm(data: ProfileFormData) {
        if(user){
            handleSave(data)
        } else {
            handleCreate(data)
        }
    }

    async function getUserData(){
        let userFinded;
        try {
            userFinded = await api.get(`/user/${user}`)
            setFormValues(userFinded.data)
            setUserId(userFinded.data.id)
        } catch (error) {
            setLoading(false)
            alert(error.response.data.message)
        }
    }

    const name = watch('name')
    const phone = watch('phone')
    const pix = watch('pix')
    const profileImage = watch('profileImage')
    // const location = watch('location')
    const isSubmitDisabled = !name || !phone || !pix || !profileImage || phone.length < 11

    useEffect(() => {
        getUserData()
    }, [user])

    return (
        <Container>
            <form onSubmit={handleSubmit(submitForm)} action="">

                <FormContainer>
                    
                    <label htmlFor="name">Nome:</label>
                    <BaseInput
                        type="text"
                        id="name"
                        placeholder="Informe o nome."
                        {...register('name')}
                    />

                    <label htmlFor="phone">Whatsapp:</label>
                    <BaseInput
                        type="text"
                        id="phone"
                        minLength="11"
                        maxLength="11"
                        placeholder="Informe o whatsapp."
                        {...register('phone')}
                    />

                    <label htmlFor="user">User:</label>
                    <BaseInput
                        type="text"
                        id="user"
                        placeholder="Informe o usuário."
                        {...register('user')}
                    />

                    <label htmlFor="password">Senha:</label>
                    <BaseInput
                        type="password"
                        id="password"
                        placeholder="Informe a senha."
                        {...register('password')}
                    />

                    <label htmlFor="pix">Pix:</label>
                    <BaseInput
                        type="text"
                        id="pix"
                        placeholder="Informe o pix."
                        {...register('pix')}
                    />

                    <label htmlFor="profileImage">Link da imagem de perfil:</label>
                    <BaseInput
                        type="text"
                        id="profileImage"
                        placeholder="Informe o link da imagem."
                        {...register('profileImage')}
                    />

                    <label htmlFor="location">Link do google maps:</label>
                    <BaseInput
                        type="text"
                        id="location"
                        placeholder="Informe o link da localização."
                        {...register('location')}
                    />

                    <label htmlFor="userType">Tipo de usuário:</label>
                    <select 
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                    >
                        <option value="">Selecione uma opção:</option>
                        <option value="shopkeeper">Lojista</option>
                        <option value="motoboy">Motoboy</option>
                        <option value="admin">Admin</option>
                    </select>   

                    <ContainerButtons>
                        <BaseButton disabled={isSubmitDisabled} type="submit">
                            {loading ?
                                <Loader size={20} biggestColor='gray' smallestColor='gray' /> :
                                user ? "Salvar" : "Criar novo usuário"
                            }
                        </BaseButton>
                        
                    </ContainerButtons>
                </FormContainer>
            </form>
        </Container>
    )
}