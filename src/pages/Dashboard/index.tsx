/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { WhatsappLogo } from 'phosphor-react'

import { DeliveryContext } from "../../context/DeliveryContext";
import api from "../../services/api";
import { Report, User } from '../../shared/interfaces'

import { 
    BaseButton, 
    Container, 
    ContainerButtons, 
    ContainerInfo, 
    ContainerDeliveries, 
    ContainerOrder, 
    ContainerShopkeeper, 
    Delivery, 
    Link, 
    ShopkeeperInfo, 
    ShopkeeperProfileImage, 
    OrderActions,
    OrderButton,
    SelectContainer,
    ContainerImagem,
    ContainerLoading,
    ContainerStatus,
    Status,
} from "./styles";
import { Loader } from '../../components/Loader';
import { StatusDelivery } from "../../shared/constants/enums.constants";
import { getLinkToWhatsapp } from "../../shared/constants/whatsapp.constants";

export function Dashboard() {
    const { token, permission } = useContext(DeliveryContext)
    api.defaults.headers.Authorization = `Bearer ${token}`

    
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const [motoboys, setMotoboys] = useState([]);

    const [isFreeReport, setIsFreeReport] = useState(true)
    const [selectedMotoboy, setSelectedMotoboy] = useState('')

    function onClickReportType(handleIsFree: boolean) {
        setIsFreeReport(handleIsFree)
        getData()
    }

    async function getData() {
        setLoading(true)
        const status = isFreeReport ? StatusDelivery.PENDING : `${StatusDelivery.ONCOURSE},${StatusDelivery.COLLECTED}`
        try {
            const response = await api.get(`/delivery?status=${status}`)
            setReports(response.data.data)

            if (permission !== 'shopkeeper') {
                const motoboysRes = await api.get('/user?type=motoboy')
                setMotoboys(motoboysRes.data.data)
                
            }

            setLoading(false)
            } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    async function handlerNextStep(report: Report) {
        let data;
        let newStatus;

        if(report.status === StatusDelivery.PENDING){
            if(!selectedMotoboy){
                alert('Selecione o motoboy')
            }
    
            newStatus = StatusDelivery.ONCOURSE
            data = {
                'status': newStatus,
                'motoboyId': selectedMotoboy
            }
        } else if(report.status === StatusDelivery.ONCOURSE){
            newStatus = StatusDelivery.COLLECTED
            data = {
                'status': newStatus
            }
        } else if(report.status === StatusDelivery.COLLECTED){
            newStatus = StatusDelivery.FINISHED
            data = {
                'status': newStatus
            }
        }

        try {
            await api.put(`/delivery/${report.id}`, data)
            getData()
            alert(`Solicitação avançada para o passo ${newStatus}`)
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    async function handlerSave(report: Report) {
        if(!selectedMotoboy){
            alert('Selecione o motoboy')
        }

        try {
            await api.put(`/delivery/${report.id}`, {
                'motoboyId': selectedMotoboy
            })
            getData()
            alert(`Motoboy foi atualizado com sucesso.`)
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    async function handlerDelete(report: Report) {
        try {
            await api.delete(`/delivery/${report.id}`)
            alert('Solicitação apagada com sucesso.')
            getData()
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        if(loading) {
            getData()
        }
    })

    return (
        <Container>
            <ContainerButtons>
                    <BaseButton typeReport={isFreeReport} onClick={() => onClickReportType(true)}>Livres</BaseButton>
                    <BaseButton typeReport={!isFreeReport} onClick={() => onClickReportType(false)}>Atribuídos</BaseButton>
            </ContainerButtons>
            <ContainerDeliveries>
                {
                    loading ? 
                        <ContainerLoading>
                            <Loader size={40} biggestColor="green" smallestColor="gray" />
                        </ContainerLoading> :
                        <>
                            { reports.map((report: Report) =>
                                <Delivery key={report.id} isfree={report.status === 'PENDENTE'}>
                                    <ContainerShopkeeper>
                                        <ContainerImagem>
                                            <ShopkeeperProfileImage src={report.establishmentImage} />
                                        </ContainerImagem>
                                        <ShopkeeperInfo>
                                            <p>{report.establishmentName}</p>
                                            <Link href={getLinkToWhatsapp(report.establishmentPhone)} target="_blank" rel="noopener noreferrer">
                                                {report.establishmentPhone} <WhatsappLogo size={18} />
                                            </Link>
                                            <Link href={report.establishmentLocation} target="_blank" rel="noopener noreferrer">
                                                <p>Localização</p>
                                            </Link>
                                        </ShopkeeperInfo>
                                    </ContainerShopkeeper>

                                    {!isFreeReport &&
                                    <>
                                        <ContainerOrder>
                                            <ContainerStatus>
                                            <p>Status:</p><Status type={report.status}>{report.status}</Status>
                                            </ContainerStatus>
                                            <p>Forma de pagamento: {report.payment}</p>
                                            <p>Valor: R$ {report.value}</p>
                                            <p>Pix: </p>
                                        </ContainerOrder>

                                        <ContainerInfo>
                                            <p>Cliente: {report.clientName} </p>
                                            <Link href={getLinkToWhatsapp(report.clientPhone)} target="_blank" rel="noopener noreferrer">
                                                {report.clientPhone} <WhatsappLogo size={18} />
                                            </Link>
                                        </ContainerInfo>

                                        <ContainerInfo>
                                            <p>Motoboy: {report.motoboyName} </p>
                                            <Link href={getLinkToWhatsapp(report.motoboyPhone)} target="_blank" rel="noopener noreferrer">
                                                {report.motoboyPhone} <WhatsappLogo size={18} />
                                            </Link>
                                        </ContainerInfo>

                                    </>
                                    }
                                    {
                                        permission !== "shopkeeper" && 
                                        <SelectContainer>
                                            <label htmlFor="motoboy">Motoboy:</label>
                                            <select 
                                                value={selectedMotoboy}
                                                onChange={e => setSelectedMotoboy(e.target.value)}
                                            >
                                                <option value="">Selecione o motoboy:</option>
                                                {
                                                    motoboys.map((motoboy: User) => 
                                                        <option key={motoboy.id} value={motoboy.id}>{motoboy.name}</option>
                                                    )
                                                }
                                            </select>
                                        </SelectContainer>
                                    }
                                    <OrderActions>
                                        {
                                            permission === "admin" && report.status === "ACAMINHO" &&
                                            <OrderButton typebutton={true} onClick={() => handlerSave(report)}>Salvar</OrderButton>
                                        }
                                        {
                                            permission !== "shopkeeper" &&
                                            <OrderButton typebutton={true} onClick={() => handlerNextStep(report)}>Avançar</OrderButton>
                                        }
                                        {
                                            permission !== "motoboy" && report.status === "PENDENTE" &&
                                            <OrderButton typebutton={false} onClick={() => handlerDelete(report)}>Apagar</OrderButton>
                                        }
                                    </OrderActions>
                                </Delivery>
                            )}
                        </>
                }
            </ContainerDeliveries>
        </Container>
    )
}