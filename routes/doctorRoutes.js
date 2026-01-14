const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');


router.get('/', doctorController.getAllDoctors);


router.post('/add', doctorController.createDoctor);

router.get('/edit/:id', doctorController.getEditPage); // Sayfayı göster
router.post('/update', doctorController.updateDoctor); // İşlemi yap


router.get('/delete/:id', doctorController.deleteDoctor);

module.exports = router;  