import { useState } from "react";
import { WhatsappLogo   } from 'phosphor-react'

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
    OrderButton
} from "./styles";

export function Dashboard() {
    const [isFreeReport, setIsFreeReport] = useState(true)
    const [assignedReport, setAssignedReport] = useState(false)

    function onClickReportType() {
        setIsFreeReport(!isFreeReport)
        setAssignedReport(!assignedReport)
    }

    return (
        <Container>
            <ContainerButtons>
                    <BaseButton typeReport={isFreeReport} onClick={onClickReportType}>Livres</BaseButton>
                    <BaseButton typeReport={assignedReport} onClick={onClickReportType}>Atribuídos</BaseButton>
            </ContainerButtons>
            <ContainerDeliveries>
                <Delivery isFree={isFreeReport}>
                    <ContainerShopkeeper>
                        <ShopkeeperProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg" />
                        <ShopkeeperInfo>
                            <p>Toca</p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                            <Link href="">
                                <p>Localização</p>
                            </Link>
                        </ShopkeeperInfo>
                    </ContainerShopkeeper>

                    {!isFreeReport &&
                    <>
                        <ContainerOrder>
                            <p>Status: Livre</p>
                            <p>Forma de pagamento: Pix</p>
                            <p>Valor: R$ 70,00</p>
                            <p>Pix: </p>
                        </ContainerOrder>

                        <ContainerInfo>
                            <p>Cliente: Matheus </p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                        </ContainerInfo>

                        <ContainerInfo>
                            <p>Motoboy: Matheus </p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                        </ContainerInfo>

                    </>
                    }
                    <OrderActions>
                        <OrderButton typeButton={true}>Atribuir</OrderButton>
                        <OrderButton typeButton={false}>Apagar</OrderButton>
                    </OrderActions>
                </Delivery>

                <Delivery isFree={isFreeReport}>
                    <ContainerShopkeeper>
                        <ShopkeeperProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg" />
                        <ShopkeeperInfo>
                            <p>Toca</p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                            <Link href="">
                                <p>Localização</p>
                            </Link>
                        </ShopkeeperInfo>
                    </ContainerShopkeeper>

                    {!isFreeReport &&
                    <>
                        <ContainerOrder>
                            <p>Status: Livre</p>
                            <p>Forma de pagamento: Pix</p>
                            <p>Valor: R$ 70,00</p>
                            <p>Pix: </p>
                        </ContainerOrder>

                        <ContainerInfo>
                            <p>Cliente: Matheus </p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                        </ContainerInfo>

                        <ContainerInfo>
                            <p>Motoboy: Matheus </p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                        </ContainerInfo>

                    </>
                    }
                    <OrderActions>
                        <OrderButton typeButton={true}>Atribuir</OrderButton>
                        <OrderButton typeButton={false}>Apagar</OrderButton>
                    </OrderActions>
                </Delivery>

                <Delivery isFree={isFreeReport}>
                    <ContainerShopkeeper>
                        <ShopkeeperProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg" />
                        <ShopkeeperInfo>
                            <p>Toca</p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                            <Link href="">
                                <p>Localização</p>
                            </Link>
                        </ShopkeeperInfo>
                    </ContainerShopkeeper>

                    {!isFreeReport &&
                    <>
                        <ContainerOrder>
                            <p>Status: Livre</p>
                            <p>Forma de pagamento: Pix</p>
                            <p>Valor: R$ 70,00</p>
                            <p>Pix: </p>
                        </ContainerOrder>

                        <ContainerInfo>
                            <p>Cliente: Matheus </p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                        </ContainerInfo>

                        <ContainerInfo>
                            <p>Motoboy: Matheus </p>
                            <Link href="">
                                (94) 9 9210-4406 <WhatsappLogo size={18} />
                            </Link>
                        </ContainerInfo>

                    </>
                    }
                    <OrderActions>
                        <OrderButton typeButton={true}>Atribuir</OrderButton>
                        <OrderButton typeButton={false}>Apagar</OrderButton>
                    </OrderActions>
                </Delivery>
            </ContainerDeliveries>
        </Container>
    )
}