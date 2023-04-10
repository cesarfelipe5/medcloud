import { IPatient } from "../api/Patient/Patient.types";
import { IResponsePagination } from "../api/Response";

export const patientMapper = (response: IResponsePagination<IPatient>): IPatient[] => {
    return response.data.data;
}