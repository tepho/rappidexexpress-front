import { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
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

const DeliveryFormValidationSchema = zod.object({
    clientName: zod.string().min(3, 'Informe o nome do cliente.'),
    clientPhone: zod
      .string()
      .min(11, 'Informe o numero do cliente.')
      .max(11),
    value: zod.string(),
  })

  
type DeliveryFormData = zod.infer<typeof DeliveryFormValidationSchema>

export function NewDelivery(){
    const { token, permission } = useContext(DeliveryContext)
    api.defaults.headers.Authorization = `Bearer ${token}`

    
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false)
    
    const [shopkeepers, setShopkeepers] = useState([]);
    const [motoboys, setMotoboys] = useState([]);

    const [establishmentId, setEstablishmentId] = useState('')
    const [motoboyId, setMotoboyId] = useState('')
    const [payment, setPayment] = useState('')

    const profileFormData = useForm<DeliveryFormData>({
        resolver: zodResolver(DeliveryFormValidationSchema),
        defaultValues: {
            clientName: '',
            clientPhone: '',
            value: '',
        },
    })

    const { handleSubmit, watch, register, reset } = profileFormData

    async function handleSave(data: DeliveryFormData) {
        if(loading){
            return
        }

        setLoading(true)
        try {
            await api.post('/delivery', {
                ...data,
                status: "PENDENTE",
                establishmentId,
                motoboyId,
                payment,
            })
            reset()
            setLoading(false)
            alert("Nova solicitação de entrega criado com sucesso!")
        } catch (error) {
            setLoading(false)
            alert(error.response.data.message)
        }
    }

    const clientName = watch('clientName')
    const clientPhone = watch('clientPhone')
    const value = watch('value')
    const isSubmitDisabled = !clientName || !clientPhone || !establishmentId || !value || !payment || !establishmentId

    async function getData(){
        try {
            const motoboysResponse = await api.get('/user?type=motoboy')
            const shopkeepersResponse = await api.get('/user?type=shopkeeper')

            setMotoboys(motoboysResponse.data.data)
            setShopkeepers(shopkeepersResponse.data.data)
            setLoadingInitial(false)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        if(loadingInitial) {
            getData()
        }
    })

    return (
        <Container>
            <form onSubmit={handleSubmit(handleSave)} action="">

                <FormContainer>
                    
                    <label htmlFor="clientName">Nome do cliente:</label>
                    <BaseInput
                        type="text"
                        id="clientName"
                        placeholder="Informe o nome do cliente."
                        {...register('clientName')}
                    />

                    <label htmlFor="clientPhone">Whatsapp do cliente:</label>
                    <BaseInput
                        type="text"
                        id="clientPhone"
                        minLength="11"
                        maxLength="11"
                        placeholder="Informe o whatsapp do cliente."
                        {...register('clientPhone')}
                    />

                    <label htmlFor="value">Valor do pedido:</label>
                    <BaseInput
                        type="text"
                        id="value"
                        placeholder="Informe o valor do pedido."
                        {...register('value')}
                    />

                    <label htmlFor="payment">Tipo de pagamento:</label>
                    <select 
                        value={payment}
                        onChange={e => setPayment(e.target.value)}
                    >
                        <option value="">Selecione uma opção:</option>
                        <option value="DÉBITO">Débito</option>
                        <option value="CRÉDITO">Crédito</option>
                        <option value="PIX">Pix</option>
                        <option value="DINHEIRO">Dinheiro</option>
                    </select>   

                    <label htmlFor="establishmentId">Qual o estabelecimento:</label>
                    <select 
                        value={establishmentId}
                        onChange={e => setEstablishmentId(e.target.value)}
                    >
                        <option value="">Selecione uma opção:</option>
                        {
                            shopkeepers.map(shopkeeper => 
                                <option key={shopkeeper.id} value={shopkeeper.id}>{shopkeeper.name}</option>
                            )
                        }
                    </select>   

                    {
                        permission === 'admin' && (
                            <>
                                <label htmlFor="motoboyId">Qual o motoboy:</label>
                                <select 
                                    value={motoboyId}
                                    onChange={e => setMotoboyId(e.target.value)}
                                >
                                    <option value="">Selecione uma opção:</option>
                                    {
                                        motoboys.map(motoboy => 
                                            <option key={motoboy.id} value={motoboy.id}>{motoboy.name}</option>
                                        )
                                    }
                                </select>   
                            </>
                        )
                    }

                    <ContainerButtons>
                        <BaseButton disabled={isSubmitDisabled} type="submit">
                            {loading ?
                                <Loader size={20} biggestColor='gray' smallestColor='gray' /> :
                                "Solicitar entrega"
                            }
                        </BaseButton>
                        
                    </ContainerButtons>
                </FormContainer>
            </form>
        </Container>
    )
}