import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutBase } from "../../shared/components/layoutBase";
import { LoadingSpinner } from "../../shared/components/loadingSpinner";
import { PatientServices } from "../../shared/services/api";
import { IPatient } from "../../shared/services/api/Patient/Patient.types";
import {
  DEFAULT_ROWS_PER_PAGE,
  INITIAL_USER_TO_DELETE,
} from "./Patient.constants";
import { IPatientRow } from "./Patient.types";

export const PatientList = (): JSX.Element => {
  const [rows, setRows] = useState<IPatientRow[]>([]);
  const [search, setSearch] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<number>(
    INITIAL_USER_TO_DELETE
  );
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const createData = (patient: IPatient) => ({
    id: patient.id,
    name: patient.name,
    email: patient.email,
    birthday: patient.birthday,
  });

  const createRows = useCallback((patientData: IPatient[]) => {
    const patientFormated = patientData.map(createData);

    setRows(patientFormated);
  }, []);

  const getAllPatients = useCallback(async () => {
    setLoading(true);

    const patients = await PatientServices.getAllPatient({
      current_page: 1,
      // per_page: rowsPerPage,
      search,
    });

    createRows(patients);

    setLoading(false);
  }, [createRows, search]);

  const handleClickOpen = (id: number) => () => {
    setPatientToDelete(id);

    setOpenDialog(true);
  };

  const handleClose = () => {
    setPatientToDelete(INITIAL_USER_TO_DELETE);

    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    setLoadingDelete(true);

    if (patientToDelete) {
      const message = await PatientServices.deletePatient({
        id: patientToDelete,
      });

      <Alert severity="success"> {message}</Alert>;

      getAllPatients();

      handleClose();

      setLoadingDelete(false);

      return;
    }

    setLoadingDelete(false);

    <Alert severity="warning">Paciente seleconado inválido</Alert>;
  };

  const onChangeTextSeach = (searchTerm: string) => setSearch(searchTerm);

  const onClickButton = (): void => navigate("/patient/detail/new");

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);

  return (
    <>
      <LayoutBase
        title="Pacientes"
        showNewButton
        onClickButton={onClickButton}
        showSearchBar
        onSearch={onChangeTextSeach}
        searchTerm={search}
      >
        <LoadingSpinner loading={loading}>
          <Box paddingX={2} paddingBottom={2} borderRadius={0} boxShadow="none">
            <TableContainer component={Paper} style={{ borderRadius: 8 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align="left">E-mail</TableCell>
                    <TableCell align="left">Data de nascimento</TableCell>
                    <TableCell align="left" />
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row: IPatientRow) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>

                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.birthday}</TableCell>
                      <TableCell align="right">
                        <>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(`/patient/detail/${row.id}`)
                            }
                          >
                            <EditOutlinedIcon color="secondary" />
                          </IconButton>

                          <IconButton
                            color="primary"
                            onClick={handleClickOpen(row.id)}
                          >
                            <DeleteOutlineOutlinedIcon color="secondary" />
                          </IconButton>
                        </>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <TablePagination
            labelRowsPerPage="Resultados por página"
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event: unknown, newPage: number) =>
              console.log("newPagenewPagenewPage", newPage)
            }
            onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              console.log("eventeventevent", event)
            }
          /> */}
          </Box>
        </LoadingSpinner>
      </LayoutBase>

      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Excluir paciente</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Você não terá mais acesso ao paciente, você quer mesmo exclui-lo?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Cancelar
          </Button>

          <LoadingButton
            variant="contained"
            onClick={confirmDelete}
            color="error"
            loading={loadingDelete}
          >
            Sim, excluir
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
