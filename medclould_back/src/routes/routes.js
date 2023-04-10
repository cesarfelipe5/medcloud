const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

router.get('/patient/:id', PatientController.show);
router.get('/patient', PatientController.list);
router.post('/patient', PatientController.store);
router.put('/patient/:id', PatientController.update);
router.delete('/patient/:id', PatientController.destroy);

module.exports = router;