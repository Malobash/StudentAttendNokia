const express = require('express');
const router = express.Router();
const pool = require('../db'); // هذا السطر بيربط بالـ db.js

// الـ Route لتسجيل الحضور
router.post('/mark', async (req, res) => {
    const { student_id } = req.body;
    try {
        const newAttendance = await pool.query(
            "INSERT INTO attendance (student_id) VALUES ($1) RETURNING *",
            [student_id]
        );
        res.json({ message: "تم تسجيل الحضور بنجاح", data: newAttendance.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;