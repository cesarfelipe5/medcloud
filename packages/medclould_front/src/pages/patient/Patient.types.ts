export interface IPatientRow {
  id: number;
  name: string;
  email: string;
  birthday: string;
}
export interface IPatientSave {
  name: string;
  email: string;
  birthday: Date;
  cpf: string;
  postalCode: string;
  address: string;
  addressNuber: string;
  addressComplement?: string;
  neighborhood: string | null;
  city: string | null;
  uf: string | null;
  country: string | null;
}
