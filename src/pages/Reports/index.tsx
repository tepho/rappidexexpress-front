import { useState } from "react";

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

export function Reports() {
    const [selectedStatus, setSelectedStatus] = useState('FINALIZADO');
    const [selectedMotoboy, setSelectedMotoboy] = useState('');
    const [selectedEstablishment, setSelectedEstablishment] = useState('');
    const [createdIn, setCreatedIn] = useState('');
    const [createdUntil, setCreatedUntil] = useState('');

    function onClickSearch(){
        console.log({selectedStatus, selectedMotoboy, selectedEstablishment, createdIn, createdUntil});
    }

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
                        <option value="motoboy1">Valor 1</option>
                        <option value="motoboy2">Valor 2</option>
                        <option value="motoboy3">Valor 3</option>
                    </select>           
                </Filter>

                <Filter>
                    <p>Estabelecimento:</p>
                    <select 
                        value={selectedEstablishment}
                        onChange={e => setSelectedEstablishment(e.target.value)}
                    >
                        <option value="establishment1">Valor 1</option>
                        <option value="establishment2">Valor 2</option>
                        <option value="establishment3">Valor 3</option>
                    </select>           
                </Filter>

                <SearchButton onClick={onClickSearch}>Buscar</SearchButton>
            </FiltersContainer>

            <ReportsContainer>
                <h2>Quantidade de entregas: 99</h2>
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
                </Delivery>
            </ReportsContainer>
        </Container>
    )
}