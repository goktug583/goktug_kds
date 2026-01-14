const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');


router.get('/', doctorController.getAllDoctors);


router.post('/add', doctorController.createDoctor);

router.get('/edit/:id', doctorController.getEditPage); 
router.post('/update', doctorController.updateDoctor); 


router.get('/delete/:id', doctorController.deleteDoctor);

module.exports = router;  