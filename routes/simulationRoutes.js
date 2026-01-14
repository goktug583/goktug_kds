const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');


router.post('/simulate-revenue', simulationController.simulateRevenue);


router.post('/analyze-doctor', simulationController.analyzeDoctorPerformance);

module.exports = router;