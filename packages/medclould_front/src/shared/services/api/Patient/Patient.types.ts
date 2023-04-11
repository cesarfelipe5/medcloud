export interface IAllPatient {
    current_page: number;
    search?: string;
}

export interface IPatient {
    id: number,
    name: string,
    email: string,
    birthday: string,
    cpf: string,
    postalCode: string,
    address: string,
    addressNuber: string,
    addressComplement: string,
    neighborhood: string | null,
    city: string | null,
    uf: string | null,
    country: string | null;
}

export interface IgetPatientById {
    id: string,
}

export interface IDeletePatient {
    id: number,
}

export interface IPatientSave {
    name: string,
    email: string,
    birthday: Date,
    cpf: string,
    postalCode: string,
    address: string,
    addressNuber: string,
    addressComplement?: string,
    neighborhood: string | null,
    city: string | null,
    uf: string | null,
    country: string | null;
}
