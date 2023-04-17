import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import moment from "moment";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { LayoutBase } from "../../../shared/components/layoutBase";
import { LoadingSpinner } from "../../../shared/components/loadingSpinner";
import { CustomTextField } from "../../../shared/forms/CustomTextField";
import { PatientServices } from "../../../shared/services/api";
import { formValidationPatientSchema } from "../Patient.constants";
import { IPatientSave } from "../Patient.types";
import { styles } from "./Patient.detail.styles";

export const PatientDetail: FC = () => {
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { id = "new" } = useParams<"id">();

  const isNewPatient = useMemo(() => id === "new", [id]);

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

  const onSubmit = async (data: IPatientSave) => {
    try {
      const validatedData = await formValidationPatientSchema.validate(data, {
        abortEarly: false,
      });

      if (isNewPatient) {
        await PatientServices.createPatient(validatedData);
      } else {
        await PatientServices.updatePatient(Number(id), validatedData);
      }
    } catch (err) {
      const typedError = err as yup.ValidationError;

      const validationErrors: { [key: string]: string } = {};

      typedError.inner.forEach((error) => {
        if (!error.path) {
          return;
        }

        validationErrors[error.path] = error.message;

        formRef.current?.setErrors(validationErrors);
      });

      return;
    }

    navigate("/patient");
  };

  const onClickCancel = () => setOpenDialog(true);

  const handleClose = () => setOpenDialog(false);

  const handleConfirm = () => {
    handleClose();

    navigate("/patient");
  };

  useEffect(() => {
    if (isNewPatient) {
      return;
    }

    getPatient();
  }, [getPatient, id, isNewPatient]);

  return (
    <>
      <LayoutBase
        title={isNewPatient ? "Cadastrar paciente" : "Editar paciente"}
      >
        <LoadingSpinner loading={loading}>
          <Box margin={1} display="flex" flex={1} borderRadius={8}>
            <Form ref={formRef} onSubmit={onSubmit} style={styles.form}>
              <Box
                display="flex"
                flex={1}
                fontSize={18}
                color={theme.palette.secondary.dark}
                borderBottom={0.5}
                borderColor={theme.palette.secondary.light}
                padding={3}
              >
                Dados Pessoais
              </Box>

              <Grid container direction="column">
                <Box
                  display="flex"
                  flex={1}
                  fontSize={18}
                  borderBottom={0.5}
                  borderColor={theme.palette.secondary.light}
                >
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
                </Box>

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
                position="absolute"
                bottom={0}
                right={0}
                left={0}
                flex={1}
                margin={2}
                justifyContent="end"
                gap={2}
                boxShadow="none"
              >
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onClickCancel}
                >
                  Cancelar
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Salvar
                </Button>
              </Box>
            </Form>
          </Box>
        </LoadingSpinner>
      </LayoutBase>

      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Cancelar {isNewPatient ? "inclusão" : "atualização"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Você não certeza que deseja cancelar a{" "}
            {isNewPatient ? "inclusão" : "atualização"} do paciente?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Cancelar
          </Button>

          <Button variant="contained" onClick={handleConfirm} color="error">
            Sim, cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
