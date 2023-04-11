const validator = require('../helper/validate');

const Validation = async (req, res, validationRule, callback) => {
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).json({
                success: false,
                message: 'Validação falhou. Verifique os campos digitados',
                data: err
            });

            return;
        };

        callback();
    }).catch(err => console.log(err));
};

module.exports = { Validation };