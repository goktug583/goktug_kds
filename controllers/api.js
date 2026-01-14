const Admin = require("../models/Admin");


exports.loginSayfasiniGoster = (req, res) => {
    res.render("login", {
        title: "Yönetici Giriş | Sağlık Rehberi KDS",
    });
};


exports.apiGirisYap = async (req, res) => {
    try {
        const { username, password } = req.body;

       
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Lütfen kullanıcı adı ve şifre giriniz!" 
            });
        }

        
        const admin = await Admin.get(req.body);

        
        if (admin[0] && admin[0][0]) {
           
            return res.status(200).json({
                success: true,
                message: "Giriş başarılı, yönlendiriliyorsunuz...",
                redirectUrl: "/" 
            });
        } else {
            
            return res.status(401).json({
                success: false,
                message: "Kullanıcı adı veya şifre hatalı!"
            });
        }

    } catch (error) {
        console.error("Login Hatası:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Sunucu tarafında bir hata oluştu." 
        });
    }
};0
