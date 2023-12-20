import { useState } from "react";
import { BaseButton, Container, ContainerButtons } from "./styles";

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
        </Container>
    )
}