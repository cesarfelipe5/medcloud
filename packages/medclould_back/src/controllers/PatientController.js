const { pagination } = require('../../utils/pagination');
const { Validation } = require('../../utils/validation');
const db = require('../database/connection');

class PatientController {
    show(req, res) {
        const { id } = req.params;

        db.select('*').table('patient').where({ id }).then(data =>
            res.status(200).json({
                success: true,
                data
            })
        ).catch(err => console.log('err', err));
    }

    list(req, res) {
        pagination(req, 'patient').then(data =>
            res.status(200).json({
                success: true,
                data
            })
        ).catch(err => {
            console.log('err', err);

            res.status(400).json({
                success: false,
                message: 'Paciente não encontrado'
            });

        });
    }

    async store(req, res) {
        const validationRule = {
            "name": "required|string|max:255",
            "email": "required|email",
            "birthday": "required|date",
            "cpf": "required|string|max:11",
            "postalCode": "required|string|max:8",
            "address": "required|string|max:100",
            "addressNuber": "string|max:5",
            "addressComplement": "string|max:100",
            "neighborhood": "required|string|max:50",
            "city": "required|string|max:50",
            "uf": "required|string|max:2",
        };

        const {
            name,
            email,
            birthday,
            cpf,
            postalCode,
            address,
            addressNuber,
            addressComplement,
            neighborhood,
            uf,
            city,
        } = req.body;

        const dataInsert = {
            name,
            email,
            birthday,
            cpf,
            postalCode,
            address,
            addressNuber,
            addressComplement,
            neighborhood,
            uf,
            city
        };

        const insert = () => db.insert(dataInsert).table('patient').then(data =>
            res.status(200).json({
                success: true,
                message: 'Paciente criado com sucesso!'
            })
        ).catch(err => {
            console.log('err', err);

            res.status(404).json({
                success: false,
                message: 'Paciente não encontrado'
            });
        });

        await Validation(req, res, validationRule, insert);
    }

    update(req, res) {
        const { id } = req.params;

        const validationRule = {
            "name": "string|max:255",
            "email": "email",
            "birthday": "date",
            "cpf": "string|max:11",
            "postalCode": "string|max:8",
            "address": "string|max:100",
            "addressNuber": "string|max:5",
            "addressComplement": "string|max:100",
            "neighborhood": "string|max:50",
            "city": "string|max:50",
            "uf": "string|max:2",
        };

        const {
            name,
            email,
            birthday,
            cpf,
            postalCode,
            address,
            addressNuber,
            addressComplement,
            neighborhood,
            uf,
            city,
        } = req.body;

        const dataUpdate = {};

        name ? dataUpdate.name = name : undefined;
        email ? dataUpdate.email = email : undefined;
        birthday ? dataUpdate.birthday = birthday : undefined;
        cpf ? dataUpdate.cpf = cpf : undefined;
        postalCode ? dataUpdate.postalCode = postalCode : undefined;
        address ? dataUpdate.address = dataUpdate : undefined;
        addressNuber ? dataUpdate.addressNuber = addressNuber : undefined;
        addressComplement ? dataUpdate.addressComplement = addressComplement : undefined;
        neighborhood ? dataUpdate.neighborhood = neighborhood : undefined;
        uf ? dataUpdate.uf = uf : undefined;
        city ? dataUpdate.city = city : undefined;

        const update = () => db.where({ id }).update(dataUpdate).table('patient').then(data =>
            res.status(200).json({
                success: true,
                message: 'Paciente atualizado com sucesso!',
                data,
            })
        ).catch(err => {
            console.log('err', err);

            res.status(404).json({
                success: false,
                message: 'Paciente não encontrado'
            });
        });

        Validation(req, res, validationRule, update);
    }

    destroy(req, res) {
        const { id } = req.params;

        db.where({ id }).del().table('patient').then(() =>
            res.status(200).json({
                success: true,
                message: 'Paciente removido com sucesso!'
            })
        ).catch(err => {
            console.log('err', err);

            res.status(404).json({
                success: false,
                message: 'Paciente não encontrado'
            });

        });
    }
}

module.exports = new PatientController;