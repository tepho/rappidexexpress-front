import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'

import { 
    BaseButton,
    BaseInput,
    Container,
    ContainerButtons,
    FormContainer
} from "./styles";

const ChangePassFormValidationSchema = zod.object({
    oldPassword: zod.string().min(4, 'Informe a senha antiga.'),
    newPassword: zod.string().min(4, 'Informe a nova senha.'),
  })

  
type ChangePassFormData = zod.infer<typeof ChangePassFormValidationSchema>

export function ChangePassword() {
    const changePasswordFormData = useForm<ChangePassFormData>({
        resolver: zodResolver(ChangePassFormValidationSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        },
    })

    function handleSave(data: ChangePassFormData) {
        console.log(data)
        // navigate('/dashboard')
    }

    const { handleSubmit, watch, register } = changePasswordFormData

    const oldPassword = watch('oldPassword')
    const newPassword = watch('newPassword')
    const isSubmitDisabled = !oldPassword || !newPassword

    return (
        <Container>
            <form onSubmit={handleSubmit(handleSave)} action="">
                <FormContainer>
                    <label htmlFor="name">Senha antiga:</label>
                    <BaseInput
                        type="password"
                        id="oldPassword"
                        placeholder="Informe a senha antiga."
                        {...register('oldPassword')}
                    />

                    <label htmlFor="name">Nova senha:</label>
                    <BaseInput
                        type="password"
                        id="newPassword"
                        placeholder="Informe a nova senha."
                        {...register('newPassword')}
                    />

                    <ContainerButtons>
                        <BaseButton disabled={isSubmitDisabled} type="submit">Salvar</BaseButton>
                    </ContainerButtons>
                </FormContainer>
            </form>
        </Container>
    )
}