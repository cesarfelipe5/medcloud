
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { LayoutBase } from "../../shared/components";
import { LoadingSpinner } from '../../shared/components/loadingSpinner/LoadingSpinner';
import { PatientServices } from '../../shared/services/api';
import { IPatient } from '../../shared/services/api/Patient/Patient.types';
import { IPatientRow } from './Dashboard.types';

export const Dashboard = (): JSX.Element => {
    // const [patient, setPatient] = useState<IPatient[]>();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<IPatientRow[]>([]);

    const createData = (
        name: string,
        email: string,
        birthday: string,
    ) => ({ name, email, birthday });

    useEffect(() => {
        setLoading(true);

        const createRows = (patientData: IPatient) => {
            const patient = createData(patientData.name, patientData.email, patientData.birthday);

            setRows(rows => ([...rows, patient]));

            rows.push(patient);
        };

        (async () => {
            const patients = await PatientServices.getAllPatient({ current_page: 1 });

            patients.forEach(createRows);

            setLoading(false);
        })();

        setLoading(false);

    }, []);

    return (
        <LayoutBase title="Pacientes" >
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

                                            <IconButton color="primary" onClick={() => console.log('Remover')}>
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
        </LayoutBase >
    );
}




