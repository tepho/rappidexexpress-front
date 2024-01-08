import { Container, DataContainer, Filter, FiltersContainer, SearchButton } from "./styles";

export function Reports() {
    return (
        <Container>
            <FiltersContainer>
                <h2>Filtros</h2>
                <DataContainer>
                    <form>
                        <label htmlFor="birthday">De:</label>
                        <input type="date" id="birthday" name="birthday" />
                        <label htmlFor="birthday">até:</label>
                        <input type="date" id="birthday" name="birthday" />
                    </form>
                </DataContainer>

                <Filter>
                    <p>Status:</p>
                    <select name="select">
                        <option value="valor1">Valor 1</option>
                        <option value="valor2" selected>Valor 2</option>
                        <option value="valor3">Valor 3 asdasdasd asd asd</option>
                    </select>           
                </Filter>

                <Filter>
                    <p>Motoboy:</p>
                    <select name="select">
                        <option value="valor1">Valor 1</option>
                        <option value="valor2" selected>Valor 2</option>
                        <option value="valor3">Valor 3</option>
                    </select>           
                </Filter>

                <Filter>
                    <p>Estabelecimento:</p>
                    <select name="select">
                        <option value="valor1">Valor 1</option>
                        <option value="valor2" selected>Valor 2</option>
                        <option value="valor3">Valor 3</option>
                    </select>           
                </Filter>

                <SearchButton>Buscar</SearchButton>
            </FiltersContainer>
        </Container>
    )
}