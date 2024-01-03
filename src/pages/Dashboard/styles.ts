import styled from 'styled-components'

export const Container = styled.main`
  flex: 1;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;
`

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

interface ButtonProps {
  typeReport: boolean
}

export const BaseButton = styled.div<ButtonProps>`
  background: ${(props) => props.typeReport ? props.theme['gray-500'] : props.theme['gray-800']};

  border: solid;
  padding: 1rem;
  border-radius: 1rem 1rem 0rem 0rem;
  border-color: ${(props) => props.typeReport ? props.theme['gray-500'] : props.theme['gray-500']};

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  color: ${(props) => props.typeReport ? props.theme['gray-900'] : props.theme['gray-500']};

  cursor: pointer;
`

export const ContainerDeliveries = styled.div`
  background: ${(props) => props.theme['gray-500']};
  min-width: 20rem;
  border-radius: 1rem;
`;

export const Delivery = styled.div`
  background-color: ${(props) => props.theme['green-700']};
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 10px;
`;

export const Link = styled.a`
  display: flex;
  gap: 0.2rem;
  text-decoration: none;
  color: ${(props) => props.theme['gray-300']};

  font-weight: bold;
`;

export const ContainerShopkeeper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ShopkeeperProfileImage = styled.img`
  height: 6rem;
  border-radius: 100%;
  border: solid;
`;

export const ShopkeeperInfo = styled.div``;

export const ContainerOrder = styled.div`
  margin: 1rem;
`;

export const ContainerInfo = styled.div`
  margin: 1rem;
`;

export const OrderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

interface OrderProps {
  typeButton: boolean
}

export const OrderButton = styled.div<OrderProps>`
  /* background: ${(props) => props.theme['gray-800']}; */
  background: ${(props) => props.typeButton ? props.theme['green-500'] : props.theme['red-700']};
  border: none;
  border-radius: 10%;

  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  color: ${(props) => props.theme['gray-300']};

  cursor: pointer;
`;