import { Button } from "@mui/material";
import { FormHandles } from '@unform/core';
import { Form } from "@unform/web";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBase } from "../../shared/components/layoutBase";
import { LoadingSpinner } from "../../shared/components/loadingSpinner";
import { CustomTextField } from "../../shared/forms/CustomTextField";
import { IPatient, PatientServices } from "../../shared/services/api";

export const PatientDetail: FC = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const { id = 'new' } = useParams<'id'>();

    const getPatient = useCallback(
        async () => {
            setLoading(true);

            const patient = await PatientServices.getPatientById({ id });

            if (patient) {
                console.log('patientpatientpatient', patient);

                formRef.current?.setData(patient);
            }

            setLoading(false);
        },
        [id],
    );

    const onSubmit = (dados: IPatient) => {

        if (id === 'new') {
            PatientServices.createPatient(dados);

        } else {

            // PatientServices.updatePatient(dados);
        }

        navigate('/patient');
    };

    useEffect(() => {
        if (id === 'new') {
            return;
        }

        getPatient();
    }, [getPatient, id]);


    return (
        <LayoutBase title={id === 'new' ? 'Cadastrar paciente' : 'Editar paciente'}>
            <LoadingSpinner loading={loading}>
                <Form ref={formRef} onSubmit={onSubmit}>

                    <CustomTextField label="Nome completo" placeholder="Nome completo" name='name' />
                    <CustomTextField label="E-mail" placeholder="E-mail" type="email" name='email' />
                    <CustomTextField label="Data de nascimento" type="date" name='birthday' InputLabelProps={{ shrink: true }} />
                    <CustomTextField label="CPF" placeholder="CPF" name='cpf'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />

                    <Button type="submit">Salvar</Button>
                </Form>
            </LoadingSpinner >
        </LayoutBase>
    );
};