
const db = require('../database/db'); 


exports.simulateRevenue = async (req, res) => {
    try {
        const { departmentName, examFee } = req.body;

       
        if (examFee <= 0) {
            return res.status(400).json({
                success: false,
                message: "Hata: Muayene ücreti 0 veya negatif olamaz!"
            });
        }

        
        if (examFee > 50000) {
            return res.status(400).json({
                success: false,
                message: "Hata: Girdiğiniz ücret piyasa koşullarının çok üzerinde, simülasyon yapılamıyor."
            });
        }

        
        let missedPatientCount = 0;
        
       
        switch(departmentName) {
            case 'Kardiyoloji': missedPatientCount = 150; break;
            case 'Nöroloji': missedPatientCount = 120; break;
            case 'Ortopedi': missedPatientCount = 90; break;
            default: missedPatientCount = 50; 
        }

        
        const potentialRevenue = missedPatientCount * examFee;

        return res.status(200).json({
            success: true,
            department: departmentName,
            missedPatients: missedPatientCount,
            simulatedFee: examFee,
            totalPotentialRevenue: potentialRevenue,
            message: `${departmentName} için ${examFee} TL ücretle tahmini ${potentialRevenue} TL kazanabilirsiniz.`
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Simülasyon hatası" });
    }
};


exports.analyzeDoctorPerformance = async (req, res) => {
    try {
        const { doctorId } = req.body; 

        
        const [rows] = await db.execute(
            "SELECT SUM(muayene_sayisi) as totalPatients, doktor_adi FROM muayeneler WHERE doktor_id = ?", 
            [doctorId]
        );

        if (rows.length === 0 || !rows[0].totalPatients) {
            return res.status(404).json({ success: false, message: "Doktor verisi bulunamadı." });
        }

        const totalPatients = rows[0].totalPatients;
        const doctorName = rows[0].doktor_adi;

        let status = "";
        let bonusPercentage = 0;

       
        if (totalPatients < 20) {
            status = "Geliştirilmeli";
            bonusPercentage = 0;
        } else if (totalPatients >= 20 && totalPatients < 100) {
            status = "Standart Performans";
            bonusPercentage = 5;
        } else {
            status = "Yüksek Performans (Yıldız Doktor)";
            bonusPercentage = 15;
        }

        return res.status(200).json({
            success: true,
            doctor: doctorName,
            totalPatients: totalPatients,
            performanceStatus: status,
            suggestedBonus: `%${bonusPercentage}`,
            message: `Doktor ${doctorName}, ${status} kategorisindedir.`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Analiz hatası" });
    }
};