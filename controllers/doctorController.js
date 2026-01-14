const connection = require('../database/db'); 


exports.getAllDoctors = async (req, res) => {
    try {
        const sql = `
            SELECT d.*, 
                   g.name AS gender_name, 
                   dept.name AS department_name 
            FROM doctor d 
            LEFT JOIN gender g ON d.gender_id = g.id 
            LEFT JOIN department dept ON d.department_id = dept.id
        `;

        const [doctors] = await connection.query(sql);
        const [genders] = await connection.query("SELECT * FROM gender");
        const [departments] = await connection.query("SELECT * FROM department");

        res.render('doctors', { 
            doctors: doctors,
            genders: genders,
            departments: departments,
            activePage: 'doctors',
            baseURL: '',
            title: 'Doktor Yönetim Paneli' 
        });

    } catch (err) {
        console.error("Listeleme hatası:", err);
        res.status(500).send("Veritabanı hatası oluştu: " + err.message);
    }
};


exports.createDoctor = async (req, res) => {
    try {
        const { name, surname, gender_id, department_id } = req.body;
        const sql = "INSERT INTO doctor (name, surname, gender_id, department_id) VALUES (?, ?, ?, ?)";
        
        await connection.query(sql, [name, surname, gender_id, department_id]);
        res.redirect('/doctors');
    } catch (err) {
        console.error("Ekleme hatası:", err);
        res.status(500).send("Doktor eklenirken hata oluştu.");
    }
};


exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const sql = "DELETE FROM doctor WHERE id = ?";
        
        await connection.query(sql, [doctorId]);
        res.redirect('/doctors');
    } catch (err) {
        console.error("Silme hatası:", err);
        res.status(500).send("Silme işlemi başarısız.");
    }
};


exports.getEditPage = async (req, res) => {
    try {
        const doctorId = req.params.id;
        
        const [doctors] = await connection.query("SELECT * FROM doctor WHERE id = ?", [doctorId]);
        const [genders] = await connection.query("SELECT * FROM gender");
        const [departments] = await connection.query("SELECT * FROM department");

        if (doctors.length === 0) {
            return res.status(404).send("Doktor bulunamadı");
        }
        
        res.render('edit_doctor', { 
            doctor: doctors[0],
            genders: genders,
            departments: departments,
            activePage: 'doctors',
            baseURL: '',
            title: 'Doktor Düzenle' 
        });

    } catch (err) {
        console.error("Edit sayfası hatası:", err);
        res.status(500).send("Veritabanı hatası.");
    }
};


exports.updateDoctor = async (req, res) => {
    try {
        const { id, name, surname, gender_id, department_id } = req.body; 
        
        const sql = "UPDATE doctor SET name = ?, surname = ?, gender_id = ?, department_id = ? WHERE id = ?";

        await connection.query(sql, [name, surname, gender_id, department_id, id]);
        
        res.redirect('/doctors');
    } catch (err) {
        console.error("Güncelleme hatası:", err);
        res.status(500).send("Güncelleme işlemi başarısız.");
    }
};