import { IPatient } from "../api/Patient/Patient.types";
import { IResponsePagination } from "../api/Response";
import { IDataResponse } from "../api/Response/Response.types";

export const patientMapper = (response: IDataResponse<IPatient>): IPatient => {
    return response.data?.[0];
};

export const patientListMapper = (response: IResponsePagination<IPatient>): IPatient[] => {
    return response.data.data;
};