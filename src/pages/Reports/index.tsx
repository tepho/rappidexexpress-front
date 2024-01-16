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
    ReportsContainer, 
    SearchButton, 
    ShopkeeperInfo, 
    ShopkeeperProfileImage 
} from "./styles";
import api from "../../services/api";
import { DeliveryContext } from "../../context/DeliveryContext";

export function Reports() {
    const { token } = useContext(DeliveryContext)
    api.defaults.headers.Authorization = `Bearer ${token}`
    
    
    const [motoboys, setMotoboys] = useState([]);
    const [shopkeepers, setShopkeepers] = useState([]);

    const [reports, setReports] = useState([]);
    const [reportsAmount, setReportsAmount] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState('FINALIZADO');
    const [selectedMotoboy, setSelectedMotoboy] = useState('');
    const [selectedEstablishment, setSelectedEstablishment] = useState('');
    const [createdIn, setCreatedIn] = useState('');
    const [createdUntil, setCreatedUntil] = useState('');

    async function onClickSearch(){
        console.log({selectedStatus, selectedMotoboy, selectedEstablishment, createdIn, createdUntil});
        let param = '';
        if(selectedMotoboy){
            param = `${param}&motoboyId=${selectedMotoboy}`
        }
        if(selectedEstablishment){
            param = `${param}&establishmentId=${selectedEstablishment}`
        }
        if(createdIn){
            param = `${param}&createdIn=${createdIn}`
        }
        if(createdUntil){
            param = `${param}&createdUntil=${createdUntil}`
        }

        try {
            const response = await api.get(`/delivery?status=${selectedStatus}${param}`)
            setReports(response.data.data)
            setReportsAmount(response.data.count)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    async function getData(){
        try {
            const motoboysResponse = await api.get('/user?type=motoboy')
            const shopkeepersResponse = await api.get('/user?type=shopkeeper')

            setMotoboys(motoboysResponse.data.data)
            setShopkeepers(shopkeepersResponse.data.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getData()
    })

    return (
        <Container>
            <FiltersContainer>
                <h2>Filtros</h2>
                <DataContainer>
                    <form>
                        <label htmlFor="birthday">De:</label>
                        <input type="date" value={createdIn} onChange={e => setCreatedIn(e.target.value)} />
                        <label htmlFor="birthday">até:</label>
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
                        <option value="A CAMINHO">A CAMINHO</option>
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
                            motoboys.map(motoboy => 
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
                            shopkeepers.map(shopkeeper => 
                                <option key={shopkeeper.id} value={shopkeeper.id}>{shopkeeper.name}</option>
                            )
                        }
                    </select>           
                </Filter>

                <SearchButton onClick={onClickSearch}>Buscar</SearchButton>
            </FiltersContainer>

            <ReportsContainer>
                <h3>Quantidade de entregas: {reportsAmount}</h3>
                {reports.map((report) => 
                    <Delivery key={report.id}>
                        <ContainerShopkeeper>
                            <ShopkeeperProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg" />
                            <ShopkeeperInfo>
                                <p>{report.establishmentName}</p>
                                {report.establishmentPhone}
                            </ShopkeeperInfo>
                        </ContainerShopkeeper>
                        <ContainerOrder>
                            <p>Status: {report.status}</p>
                            <p>Forma de pagamento: {report.payment}</p>
                            <p>Valor: R$ {report.value}</p>
                            <p>Pix: </p>
                        </ContainerOrder>

                        <ContainerInfo>
                            <p>Cliente: {report.clientName} </p>
                                {report.clientPhone}
                        </ContainerInfo>

                        <ContainerInfo>
                            <p>Motoboy: {report.motoboyName} </p>
                            {report.motoboyPhone}
                        </ContainerInfo>
                    </Delivery>
                )}

                {/* <Delivery>
                    <ContainerShopkeeper>
                        <ShopkeeperProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg" />
                        <ShopkeeperInfo>
                            <p>Toca</p>
                            (94) 9 9210-4406
                        </ShopkeeperInfo>
                    </ContainerShopkeeper>
                    <ContainerOrder>
                        <p>Status: Livre</p>
                        <p>Forma de pagamento: Pix</p>
                        <p>Valor: R$ 70,00</p>
                        <p>Pix: </p>
                    </ContainerOrder>

                    <ContainerInfo>
                        <p>Cliente: Matheus </p>
                            (94) 9 9210-4406
                    </ContainerInfo>

                    <ContainerInfo>
                        <p>Motoboy: Matheus </p>
                        (94) 9 9210-4406
                    </ContainerInfo>
                </Delivery>

                <Delivery>
                    <ContainerShopkeeper>
                        <ShopkeeperProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg" />
                        <ShopkeeperInfo>
                            <p>Toca</p>
                            (94) 9 9210-4406
                        </ShopkeeperInfo>
                    </ContainerShopkeeper>
                    <ContainerOrder>
                        <p>Status: Livre</p>
                        <p>Forma de pagamento: Pix</p>
                        <p>Valor: R$ 70,00</p>
                        <p>Pix: </p>
                    </ContainerOrder>

                    <ContainerInfo>
                        <p>Cliente: Matheus </p>
                            (94) 9 9210-4406
                    </ContainerInfo>

                    <ContainerInfo>
                        <p>Motoboy: Matheus </p>
                        (94) 9 9210-4406
                    </ContainerInfo>
                </Delivery>

                <Delivery>
                    <ContainerShopkeeper>
                        <ShopkeeperProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg" />
                        <ShopkeeperInfo>
                            <p>Toca</p>
                            (94) 9 9210-4406
                        </ShopkeeperInfo>
                    </ContainerShopkeeper>
                    <ContainerOrder>
                        <p>Status: Livre</p>
                        <p>Forma de pagamento: Pix</p>
                        <p>Valor: R$ 70,00</p>
                        <p>Pix: </p>
                    </ContainerOrder>

                    <ContainerInfo>
                        <p>Cliente: Matheus </p>
                            (94) 9 9210-4406
                    </ContainerInfo>

                    <ContainerInfo>
                        <p>Motoboy: Matheus </p>
                        (94) 9 9210-4406
                    </ContainerInfo>
                </Delivery> */}
            </ReportsContainer>
        </Container>
    )
}