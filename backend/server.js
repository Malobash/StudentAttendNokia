const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db'); // التأكد من وجود db.js في نفس المجلد

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// استيراد الـ Routes (تأكد إن الملفات موجودة في مجلد routes)
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');

// تفعيل المسارات
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});