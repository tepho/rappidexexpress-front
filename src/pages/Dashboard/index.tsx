import { useContext, useEffect, useState } from "react";
import { WhatsappLogo } from 'phosphor-react'

import { DeliveryContext } from "../../context/DeliveryContext";
import api from "../../services/api";

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
} from "./styles";
import { Loader } from '../../components/Loader';

export function Dashboard() {
    const { token, permission } = useContext(DeliveryContext)
    api.defaults.headers.Authorization = `Bearer ${token}`

    
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);

    const [isFreeReport, setIsFreeReport] = useState(true)
    const [assignedReport, setAssignedReport] = useState(false)
    const [selectedMotoboy, setSelectedMotoboy] = useState('')

    console.log(reports)
    function onClickReportType() {
        setIsFreeReport(!isFreeReport)
        setAssignedReport(!assignedReport)
    }

    async function getData() {
        try {
            const response = await api.get(`/delivery?status=PENDENTE`)
            setReports(response.data.data)
            setLoading(false)
            console.log(reports)
            console.log(response.data.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        if(loading) {
            console.log('getData')
            getData()
        }
    })

    return (
        <Container>
            <ContainerButtons>
                    <BaseButton typeReport={isFreeReport} onClick={onClickReportType}>Livres</BaseButton>
                    <BaseButton typeReport={assignedReport} onClick={onClickReportType}>Atribuídos</BaseButton>
            </ContainerButtons>
            <ContainerDeliveries>
                {
                    loading ? 
                        <Loader size={40} biggestColor="green" smallestColor="gray" /> :
                        <>
                            { reports.map((report) =>
                                <Delivery key={report.id} isfree={report.status === 'PENDENTE'}>
                                    <ContainerShopkeeper>
                                        <ContainerImagem>
                                            <ShopkeeperProfileImage src={report.establishmentImage} />
                                        </ContainerImagem>
                                        <ShopkeeperInfo>
                                            <p>{report.establishmentName}</p>
                                            <Link href="">
                                                {report.establishmentPhone} <WhatsappLogo size={18} />
                                            </Link>
                                            <Link href={report.establishmentLocation}>
                                                <p>Localização</p>
                                            </Link>
                                        </ShopkeeperInfo>
                                    </ContainerShopkeeper>

                                    {!isFreeReport &&
                                    <>
                                        <ContainerOrder>
                                            <p>Status: {report.status}</p>
                                            <p>Forma de pagamento: {report.payment}</p>
                                            <p>Valor: R$ {report.value}</p>
                                            <p>Pix: </p>
                                        </ContainerOrder>

                                        <ContainerInfo>
                                            <p>Cliente: {report.clientName} </p>
                                            <Link href="">
                                                {report.clientPhone} <WhatsappLogo size={18} />
                                            </Link>
                                        </ContainerInfo>

                                        <ContainerInfo>
                                            <p>Motoboy: {report.motoboyName} </p>
                                            <Link href="">
                                                {report.motoboyPhone} <WhatsappLogo size={18} />
                                            </Link>
                                        </ContainerInfo>

                                    </>
                                    }

                                    {/* permission === "admin" && <SelectContainer>
                                        <label htmlFor="userType">Motoboy:</label>
                                        <select 
                                            value={selectedMotoboy}
                                            onChange={e => setSelectedMotoboy(e.target.value)}
                                        >
                                            <option value="shopkeeper">Lojista</option>
                                            <option value="motoboy">Motoboy</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </SelectContainer> */}

                                    <OrderActions>
                                        <OrderButton typebutton={true}>Atribuir</OrderButton>
                                        <OrderButton typebutton={false}>Apagar</OrderButton>
                                    </OrderActions>
                                </Delivery>
                            )}
                        </>
                }
            </ContainerDeliveries>
        </Container>
    )
}