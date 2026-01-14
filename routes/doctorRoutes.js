const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');


router.get('/', doctorController.getAllDoctors);


router.post('/add', doctorController.createDoctor);


router.get('/delete/:id', doctorController.deleteDoctor);

module.exports = router;  