
const connection = require('../database/db'); 

exports.getAllDoctors = async (req, res) => {
    try {
        
        const sqlDoctors = `
            SELECT doctor.*, department.name as department_name, gender.name as gender_name 
            FROM doctor 
            LEFT JOIN department ON doctor.department_id = department.id
            LEFT JOIN gender ON doctor.gender_id = gender.id
            ORDER BY doctor.id DESC`;
        
        const sqlDepartments = `SELECT * FROM department`;
        const sqlGenders = `SELECT * FROM gender`;

        
        const [doctors] = await connection.query(sqlDoctors);
        const [departments] = await connection.query(sqlDepartments);
        const [genders] = await connection.query(sqlGenders);

        res.render('doctors', { doctors, departments, genders });

    } catch (err) {
        console.error("Doktorları çekerken hata:", err);
        res.send("Veritabanı hatası oluştu: " + err.message);
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const { name, surname, gender_id, department_id } = req.body;
        const sql = `INSERT INTO doctor (name, surname, gender_id, department_id) VALUES (?, ?, ?, ?)`;
        
        await connection.query(sql, [name, surname, gender_id, department_id]);
        
        res.redirect('/doctors');

    } catch (err) {
        console.error("Ekleme hatası:", err);
        res.send("Doktor eklenirken hata oluştu: " + err.message);
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM doctor WHERE id = ?`;
        
        await connection.query(sql, [id]);
        
        res.redirect('/doctors');

    } catch (err) {
        console.error("Silme hatası:", err);
        
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
             return res.send(`
                <h3>Bu doktor silinemez!</h3>
                <p>Çünkü bu doktora ait kayıtlı muayeneler var. (İş Kuralı Gereği)</p>
                <a href="/doctors">Geri Dön</a>
            `);
        }
        res.send("Silme işlemi başarısız: " + err.message);
    }
};