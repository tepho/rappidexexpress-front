import styled from 'styled-components'

export const Container = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2rem;
`

export const ContainerButtons = styled.div`
  width: 30%;
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

  gap: 0.5rem;
  font-weight: bold;
  color: ${(props) => props.typeReport ? props.theme['gray-900'] : props.theme['gray-500']};

  cursor: pointer;
`
