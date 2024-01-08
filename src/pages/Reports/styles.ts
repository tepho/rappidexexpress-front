import styled from 'styled-components'

export const Container = styled.main`
  flex: 1;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`

export const FiltersContainer = styled.div`
  padding: 1rem;
`;

export const DataContainer = styled.div`
    margin-top: 1rem;

    input {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        height: 2rem;
    }
`;

export const Filter = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    align-items: center;
    
    select {
        margin-left: 1rem;
        height: 2rem;
    }
`;

export const SearchButton = styled.div`
    background: ${(props) => props.theme['green-700']};
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;

    cursor: pointer;
`;
