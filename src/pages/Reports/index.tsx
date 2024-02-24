/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";

import { 
    Container, 
    ContainerInfo, 
    ContainerOrder, 
    ContainerShopkeeper, 
    DataContainer, 
    Delivery, 
    Filter, 
    FiltersContainer, 
    ProfileImageContainer, 
    ReportsContainer, 
    SearchButton, 
    ShopkeeperInfo, 
    ShopkeeperProfileImage 
} from "./styles";
import api from "../../services/api";
import { DeliveryContext } from "../../context/DeliveryContext";
import { User, Report } from "../../shared/interfaces";

export function Reports() {
    const { token } = useContext(DeliveryContext)
    api.defaults.headers.Authorization = `Bearer ${token}`
    
    const [loadingInitial, setLoadingInitial] = useState(true);

    const [motoboys, setMotoboys] = useState([]);
    const [shopkeepers, setShopkeepers] = useState([]);

    const [reports, setReports] = useState([]);
    const [reportsAmount, setReportsAmount] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState('FINALIZADO');
    const [selectedMotoboy, setSelectedMotoboy] = useState('');
    const [selectedEstablishment, setSelectedEstablishment] = useState('');
    const [createdIn, setCreatedIn] = useState('');
    const [createdUntil, setCreatedUntil] = useState('');

    function formatNumber(number: string){
        const cleaned = ('' + number).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{2})(\d{4}|\d{5})(\d{4})$/);

        if (match) {
            return ['(', match[2], ')', match[3], '-', match[4]].join('')
        }
        return '';
    }

    async function onClickSearch(){
        let param = '';
        if(selectedMotoboy){
            param = `${param}&motoboyId=${selectedMotoboy}`
        }
        if(selectedEstablishment){
            param = `${param}&establishmentId=${selectedEstablishment}`
        }
        if(createdIn){
            param = `${param}&createdIn=${createdIn}T00:00:00.000Z`
        }
        if(createdUntil){
            param = `${param}&createdUntil=${createdUntil}T23:59:59.000Z`
        }

        try {
            const response = await api.get(`/delivery?status=${selectedStatus}${param}`)
            setReports(response.data.data)
            setReportsAmount(response.data.count)
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    async function getData(){
        try {
            const motoboysResponse = await api.get('/user?type=motoboy')
            const shopkeepersResponse = await api.get('/user?type=shopkeeper')

            setMotoboys(motoboysResponse.data.data)
            setShopkeepers(shopkeepersResponse.data.data)
            setLoadingInitial(false)
        } catch (error: any) {
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
            <FiltersContainer>
                <h2>Filtros</h2>
                <DataContainer>
                    <form>
                        <label htmlFor="birthday">De:</label>
                        <input type="date" value={createdIn} onChange={e => setCreatedIn(e.target.value)} /> <br/>
                    </form>
                </DataContainer>

                <DataContainer>
                    <form>
                        <label htmlFor="birthday">Até:</label>
                        <input disabled={!createdIn} type="date" min={createdIn} value={createdUntil} onChange={e => setCreatedUntil(e.target.value)} />
                    </form>
                </DataContainer>

                <Filter>
                    <p>Status:</p>
                    <select 
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                    >
                        <option value="PENDENTE">PENDENTE</option>
                        <option value="ACAMINHO">A CAMINHO</option>
                        <option value="COLETADO">COLETADO</option>
                        <option value="FINALIZADO">FINALIZADO</option>
                        <option value="CANCELADO">CANCELADO</option>
                    </select>           
                </Filter>

                <Filter>
                    <p>Motoboy:</p>
                    <select 
                        value={selectedMotoboy}
                        onChange={e => setSelectedMotoboy(e.target.value)}
                    >
                        <option value=''>Todos</option>
                        {
                            motoboys.map((motoboy: User) => 
                                <option key={motoboy.id} value={motoboy.id}>{motoboy.name}</option>
                            )
                        }
                    </select>           
                </Filter>

                <Filter>
                    <p>Estabelecimento:</p>
                    <select 
                        value={selectedEstablishment}
                        onChange={e => setSelectedEstablishment(e.target.value)}
                    >
                        <option value=''>Todos</option>
                        {
                            shopkeepers.map((shopkeeper: User) => 
                                <option key={shopkeeper.id} value={shopkeeper.id}>{shopkeeper.name}</option>
                            )
                        }
                    </select>           
                </Filter>

                <SearchButton onClick={onClickSearch}>Buscar</SearchButton>
            </FiltersContainer>

            <ReportsContainer>
                <h3>Quantidade de entregas: {reportsAmount}</h3>
                {reports.map((report: Report) => 
                    <Delivery key={report.id}>
                        <ContainerShopkeeper>
                            <ProfileImageContainer>
                                <ShopkeeperProfileImage src={report.establishmentImage} />
                            </ProfileImageContainer>
                            <ShopkeeperInfo>
                                <p>{report.establishmentName}</p>
                                {formatNumber(`+55${report.establishmentPhone}`)}
                            </ShopkeeperInfo>
                        </ContainerShopkeeper>
                        <ContainerOrder>
                            <p>Status: {report.status}</p>
                            <p>Forma de pagamento: {report.payment}</p>
                            <p>Valor: R$ {report.value}</p>
                            <p>Pix: {report.establishmentPix}</p>
                            <p>Refrigerante: {report.soda}</p>
                        </ContainerOrder>

                        <ContainerInfo>
                            <p>Cliente: {report.clientName} </p>
                                {formatNumber(`+55${report.clientPhone}`)}
                        </ContainerInfo>

                        <ContainerInfo>
                            <p>Motoboy: {report.motoboyName} </p>
                            {formatNumber(`+55${report.motoboyPhone}`)}
                        </ContainerInfo>
                    </Delivery>
                )}

            </ReportsContainer>
        </Container>
    )
}