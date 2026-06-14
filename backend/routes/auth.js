const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// الـ Route للـ Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // البحث عن المستخدم بالإيميل
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "الإيميل أو كلمة المرور غير صحيحة" });
        }

        const user = userResult.rows[0];

        // مقارنة كلمة المرور المشفرة
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "الإيميل أو كلمة المرور غير صحيحة" });
        }

        res.status(200).json({ message: "تم تسجيل الدخول بنجاح", userId: user.id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("خطأ في السيرفر");
    }
});

module.exports = router;