const express = require("express");
const ejs = require("ejs");
require("dotenv").config(); 

const app = express(); 



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


const Count = require("./models/Count");
const Doctor = require("./models/Doctor");
const Sick = require("./models/Sick");
const Loses = require("./models/Loses");
const Department = require("./models/Department");
const doctorRoutes = require('./routes/doctorRoutes');
// --- ROTALAR (Routes) ---

const simulationRoutes = require('./routes/simulationRoutes');
app.use('/api/analysis', simulationRoutes);
app.use('/doctors', doctorRoutes);

// 2. Mevcut Sayfa Rotaları
app.get("/", async (req, res) => {
    const total_revenue = await Count.total_revenue();
    const total_examination = await Count.total_examination();
    const total_department = await Count.total_department();
    const total_doctor = await Count.total_doctor();

    res.render("index", {
        title: "Ana Sayfa | Sağlık Rehberi KDS",
        activePage: "dashboard",
        total_revenue: total_revenue[0],
        total_examination: total_examination[0],
        total_department: total_department[0],
        total_doctor: total_doctor[0],
    });
});

app.get("/department", async (req, res) => {
    res.render("./department/index", {
        title: "Departmanlar | Sağlık Rehberi KDS",
        activePage: "department",
    });
});

app.get("/cost", async (req, res) => {
    const list_departments = await Department.list_departments();
    res.render("./cost/index", {
        title: "Kayıp Kazançlar | Sağlık Rehberi KDS",
        activePage: "cost",
        list_departments: list_departments[0],
    });
});

app.post("/department/update/examination_price", async (req, res) => {
    const department = await Department.update_examination_price(req.body);
    if (department) res.redirect("/cost");
});

// --- API ENDPOINTLERİ ---

app.get("/api/monthly_examination_numbers_of_all_internists", async (req, res) => {
    const data = await Doctor.monthly_examination_numbers_of_all_internists();
    res.status(200).json({ monthly_examination_numbers_of_all_internists: data[0] });
});

app.get("/api/number_of_examination_for_internists_by_month", async (req, res) => {
    const data = await Doctor.number_of_examination_for_internists_by_month();
    res.status(200).json({ number_of_examination_for_internists_by_month: data[0] });
});

app.get("/api/distribution_of_examination_by_internists", async (req, res) => {
    const data = await Doctor.distribution_of_examination_by_internists();
    res.status(200).json({ distribution_of_examination_by_internists: data[0] });
});

app.get("/api/total_revenue_by_record_date", async (req, res) => {
    const data = await Sick.total_revenue_by_record_date();
    res.status(200).json({ total_revenue_by_record_date: data[0] });
});

app.get("/api/number_of_doctors_in_departments", async (req, res) => {
    const data = await Doctor.number_of_doctors_in_departments();
    res.status(200).json({ number_of_doctors_in_departments: data[0] });
});

app.get("/api/sick_by_gender", async (req, res) => {
    const data = await Sick.sick_by_gender();
    res.status(200).json({ sick_by_gender: data[0] });
});

app.get("/api/distribution_of_examination_and_revenue_for_other_departments", async (req, res) => {
    const data = await Doctor.distribution_of_examination_and_revenue_for_other_departments();
    res.status(200).json({ distribution_of_examination_and_revenue_for_other_departments: data[0] });
});

app.get("/api/distribution_of_examination_and_revenue_for_all_departments", async (req, res) => {
    const data = await Doctor.distribution_of_examination_and_revenue_for_all_departments();
    res.status(200).json({ distribution_of_examination_and_revenue_for_all_departments: data[0] });
});

app.get("/api/numbers_of_sicks_for_all_departments_by_doctor", async (req, res) => {
    const data = await Doctor.numbers_of_sicks_for_all_departments_by_doctor();
    res.status(200).json({ numbers_of_sicks_for_all_departments_by_doctor: data[0] });
});

app.get("/api/numbers_of_examinations_for_unavailable_departments", async (req, res) => {
    const data = await Loses.numbers_of_examinations_for_unavailable_departments();
    res.status(200).json({ numbers_of_examinations_for_unavailable_departments: data[0] });
});

app.get("/api/revenues_of_examinations_for_unavailable_departments", async (req, res) => {
    const data = await Loses.revenues_of_examinations_for_unavailable_departments();
    res.status(200).json({ revenues_of_examinations_for_unavailable_departments: data[0] });
});

app.get("/api/numbers_of_examinations_for_unavailable_departments_by_month", async (req, res) => {
    const data = await Loses.numbers_of_examinations_for_unavailable_departments_by_month();
    res.status(200).json({ numbers_of_examinations_for_unavailable_departments_by_month: data[0] });
});

app.get("/api/numbers_of_examinations_for_unavailable_departments_by_month_by_department", async (req, res) => {
    const data = await Loses.numbers_of_examinations_for_unavailable_departments_by_month_by_department();
    res.status(200).json({ numbers_of_examinations_for_unavailable_departments_by_month_by_department: data[0] });
});


const PORT = process.env.PORT || 3000; 
app.locals.baseURL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});