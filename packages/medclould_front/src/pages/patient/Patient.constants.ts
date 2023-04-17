import { cpf } from "cpf-cnpj-validator";
import * as yup from "yup";
import { object } from "yup";
import { ptForm } from "yup-locale-pt";

yup.setLocale(ptForm);

export const INITIAL_USER_TO_DELETE = 0;
export const DEFAULT_ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

export const formValidationPatientSchema = object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup.date().required().max(new Date().toString()),
  cpf: yup
    .string()
    .required()
    .test((value) => cpf.isValid(value)),
  postalCode: yup.string().required().length(8),
  address: yup.string().required(),
  addressNuber: yup.string().required(),
  addressComplement: yup.string(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  uf: yup.string().required(),
  country: yup.string().length(2).required(),
});
