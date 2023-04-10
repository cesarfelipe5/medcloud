import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback, useEffect, useState } from 'react';
import { LayoutBase } from "../../shared/components";
import { LoadingSpinner } from '../../shared/components/loadingSpinner/LoadingSpinner';
import { Toolbar } from "../../shared/components/toolbar";
import { ToolbarSearch } from "../../shared/components/toolbarSearch";
import { PatientServices } from '../../shared/services/api';
import { IPatient } from '../../shared/services/api/Patient/Patient.types';
import { IPatientRow } from './Dashboard.types';
import { INITIAL_USER_TO_DELETE } from "./Dashboard.types.constants";

export const Dashboard = (): JSX.Element => {
    const [rows, setRows] = useState<IPatientRow[]>([]);
    const [search, setSearch] = useState<string>('');
    const [openDialog, setOpenDialog] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState<number>(INITIAL_USER_TO_DELETE);
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const createData = (
        patient: IPatient
    ) => ({ id: patient.id, name: patient.name, email: patient.email, birthday: patient.birthday });

    const createRows = useCallback(
        (patientData: IPatient[]) => {
            const patientFormated = patientData.map(createData);

            setRows(patientFormated);
        }, [],
    );

    const getAllPatients = useCallback(
        async () => {
            setLoading(true);

            const patients = await PatientServices.getAllPatient({ current_page: 1, search });

            createRows(patients);

            setLoading(false);
        }, [createRows, search],
    );

    const handleClickOpen = (id: number) => () => {
        setPatientToDelete(id);

        setOpenDialog(true);
    };

    const handleClose = () => {
        setPatientToDelete(INITIAL_USER_TO_DELETE);

        setOpenDialog(false);
    };

    const confirmDelete = async () => {
        console.log('patientToDeletepatientToDeletepatientToDelete', patientToDelete);

        if (patientToDelete) {
            const message = await PatientServices.deletePatient({ id: patientToDelete });

            <Alert severity="success" > {message}</Alert >;

            getAllPatients();

            handleClose();

            return;
        }

        <Alert severity="warning">Paciente seleconado inválido</Alert>;
    };

    const onChangeText = (searchTerm: string) => setSearch(searchTerm);

    useEffect(() => {
        getAllPatients();
    }, [getAllPatients]);

    return (
        <>
            <LayoutBase
                title="Pacientes"
                toolbar={<Toolbar showButton />} >

                <ToolbarSearch value={search} onChangeText={onChangeText} />

                <LoadingSpinner loading={loading}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align="left">E-mail</TableCell>
                                    <TableCell align="left">Data de nascimento</TableCell>
                                    <TableCell align="left" />
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rows.map(row => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>

                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.birthday}</TableCell>
                                        <TableCell align="left" >
                                            <div>
                                                <IconButton color="primary" onClick={() => console.log('Edit')}>
                                                    <EditOutlinedIcon color="secondary" />
                                                </IconButton>

                                                <IconButton color="primary" onClick={handleClickOpen(row.id)}>
                                                    <DeleteOutlineOutlinedIcon color="secondary" />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </LoadingSpinner>
            </LayoutBase>

            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Excluir paciente
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Você não terá mais acesso ao paciente, você quer mesmo exclui-lo?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" autoFocus onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button variant="contained" onClick={confirmDelete} autoFocus color="error">
                        Sim, excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}




