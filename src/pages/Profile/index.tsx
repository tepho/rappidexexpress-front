import { useState } from "react";

import { 
    BaseInput, 
    ChangePasswordButton, 
    Container, 
    ContainerButtons, 
    FormContainer, 
    ProfileImage, 
    SaveButton 
} from "./styles";

export function Profile(){
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    return (
        <Container>
            <form action="">
                <ProfileImage src="https://pbs.twimg.com/profile_images/1696596355903332353/nWF46LFw_400x400.jpg"  />

                <FormContainer>
                    <BaseInput
                        type="text"
                        id="name"
                        placeholder="Informe o seu nome."
                        // {...register('user')}
                    />

                    <BaseInput
                        type="text"
                        id="phone"
                        placeholder="Informe o seu whatsapp."
                        // {...register('password')}
                    />

                    <BaseInput
                        type="text"
                        id="pix"
                        placeholder="Informe o seu pix."
                        // {...register('password')}
                    />

                    <BaseInput
                        type="text"
                        id="profileImage"
                        placeholder="Informe o link da sua imagem."
                        // {...register('password')}
                    />

                    <BaseInput
                        type="text"
                        id="location"
                        placeholder="Informe o link da localização."
                        // {...register('password')}
                    />

                    <ContainerButtons>
                        <SaveButton disabled={isSubmitDisabled} type="submit">Salvar</SaveButton>
                        <ChangePasswordButton>Trocar de senha</ChangePasswordButton>
                    </ContainerButtons>
                </FormContainer>
            </form>
        </Container>
    )
}