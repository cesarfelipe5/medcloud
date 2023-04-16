import { Box, Button, Grid } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import moment from "moment";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBase } from "../../shared/components/layoutBase";
import { LoadingSpinner } from "../../shared/components/loadingSpinner";
import { CustomTextField } from "../../shared/forms/CustomTextField";
import { PatientServices } from "../../shared/services/api";
import { IPatientSave } from "./Patient.types";

export const PatientDetail: FC = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const { id = "new" } = useParams<"id">();

  const getPatient = useCallback(async () => {
    setLoading(true);

    const patient = await PatientServices.getPatientById({ id });

    if (patient) {
      formRef.current?.setData({
        ...patient,
        birthday: moment(patient.birthday).format("YYYY-MM-DD"),
      });
    }

    setLoading(false);
  }, [id]);

  const onSubmit = (dados: IPatientSave) => {
    if (id === "new") {
      PatientServices.createPatient(dados);
    } else {
      PatientServices.updatePatient(Number(id), dados);
    }

    navigate("/patient");
  };

  useEffect(() => {
    if (id === "new") {
      return;
    }

    getPatient();
  }, [getPatient, id]);

  return (
    <LayoutBase title={id === "new" ? "Cadastrar paciente" : "Editar paciente"}>
      <LoadingSpinner loading={loading}>
        <Box margin={1} display="flex" flex={1}>
          <Form
            ref={formRef}
            onSubmit={onSubmit}
            style={{
              backgroundColor: "white",
              display: "flex",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Grid container direction="column" padding={2} spacing={2}>
              <Grid container item direction="row" padding={2} spacing={2}>
                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Nome completo"
                    placeholder="Nome completo"
                    name="name"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="E-mail"
                    placeholder="E-mail"
                    type="email"
                    name="email"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Data de nascimento"
                    type="date"
                    name="birthday"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="CPF"
                    placeholder="CPF"
                    name="cpf"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" padding={2} spacing={2}>
                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Cep"
                    placeholder="Cep"
                    name="postalCode"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Endereço"
                    placeholder="Endereço"
                    name="address"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Número"
                    placeholder="Número"
                    name="addressNumber"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Complemento"
                    placeholder="Complemento"
                    name="addressComplement"
                  />
                </Grid>
              </Grid>

              <Grid container item direction="row" padding={2} spacing={2}>
                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Bairro"
                    placeholder="Bairro"
                    name="neighborhood"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="Cidade"
                    placeholder="Cidade"
                    name="city"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="UF"
                    placeholder="UF"
                    name="uf"
                  />
                </Grid>

                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    label="País"
                    placeholder="País"
                    name="country"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box
              display="flex"
              // position="absolute"
              flex={1}
              justifyContent="end"
            >
              <Button type="submit">Salvar</Button>
            </Box>
          </Form>
        </Box>
      </LoadingSpinner>
    </LayoutBase>
  );
};
