const pool = require('../config/db');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// @desc    Register a new device
exports.createDevice = async (req, res) => {
    const { name, type, location, owner_email } = req.body;
    if (!req.file) {
        return res.status(400).json({ msg: 'Please upload a device image' });
    }
    const imagePath = req.file.path;

    try {
        const [result] = await pool.query(
            'INSERT INTO devices (name, type, location, owner_email, image_path, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, type, location, owner_email, imagePath, 'Online']
        );

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: owner_email,
            subject: 'Smartty: New Device Registered!',
            html: `<h1>Device Registration Successful!</h1>
                   <p>Your new device, "<strong>${name}</strong>" (${type}), has been successfully registered to your account.</p>`,
        };
        transporter.sendMail(mailOptions);

        res.status(201).json({ id: result.insertId, name, type, location, owner_email, image_path: imagePath });
    } catch (error) {
        console.error(error);
        fs.unlinkSync(imagePath); // Clean up file on error
        res.status(500).json({ msg: 'Server error during device registration' });
    }
};

// @desc    Get all devices
exports.getAllDevices = async (req, res) => {
    try {
        const [devices] = await pool.query('SELECT * FROM devices ORDER BY registered_at DESC');
        res.json(devices);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Update a device
exports.updateDevice = async (req, res) => {
    const { id } = req.params;
    const { name, type, location, status, owner_email } = req.body;

    try {
        const [devices] = await pool.query('SELECT image_path FROM devices WHERE id = ?', [id]);
        if (devices.length === 0) return res.status(404).json({ msg: 'Device not found' });
        
        const oldImagePath = devices[0].image_path;
        let newImagePath = oldImagePath;

        if (req.file) {
            newImagePath = req.file.path;
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }

        await pool.query(
            'UPDATE devices SET name = ?, type = ?, location = ?, status = ?, owner_email = ?, image_path = ? WHERE id = ?',
            [name, type, location, status, owner_email, newImagePath, id]
        );
        res.json({ msg: 'Device updated successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Delete a device
exports.deleteDevice = async (req, res) => {
    const { id } = req.params;
    try {
        const [devices] = await pool.query('SELECT image_path FROM devices WHERE id = ?', [id]);
        if (devices.length === 0) return res.status(404).json({ msg: 'Device not found' });

        const imagePath = devices[0].image_path;
        await pool.query('DELETE FROM devices WHERE id = ?', [id]);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        
        res.json({ msg: 'Device deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};