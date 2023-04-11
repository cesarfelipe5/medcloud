import { patientMapper } from "../../mapper";
import { patientListMapper } from "../../mapper/Patient.mapper";
import { Api } from "../axios-config";
import { IAllPatient, IDeletePatient, IPatient, IgetPatientById } from "./Patient.types";

const urlBase = '/patient';

const getAllPatient = async ({ current_page, search }: IAllPatient): Promise<IPatient[]> => {
    try {
        const { data, status } = await Api.get(`${urlBase}?current_page=${current_page}&search=${search}`);

        if (status === 200) {
            return patientListMapper(data);
        }

        return [];
    } catch (error) {
        return [];

    }
};

const getPatientById = async ({ id }: IgetPatientById): Promise<IPatient | null> => {
    try {
        const { data, status } = await Api.get(`${urlBase}/${id}`);

        if (status === 200) {
            return patientMapper(data);
        }

        return null;
    } catch (error) {
        return null;
    }
};

const createPatient = async (patient: IPatient): Promise<string | null> => {
    try {
        const { data, status } = await Api.post(`${urlBase}`, patient);

        if (status === 200) {
            return data.message;
        }

        return 'Teste novamente';
    } catch (error) {
        return 'Erro ao cadastrar paciente';
    }
};

const updatePatient = async (): Promise<any> => {
    try {

    } catch (error) {

    }
};

const deletePatient = async ({ id }: IDeletePatient): Promise<string> => {
    try {
        const { data, status } = await Api.delete(`${urlBase}/${id}`);

        if (status === 200) {
            return data.message;
        }

        return 'Tente novamente';

    } catch (error) {
        return 'Erro ao excluir usuário';
    }
};

export const PatientServices = {
    getAllPatient, getPatientById, createPatient, updatePatient, deletePatient
};