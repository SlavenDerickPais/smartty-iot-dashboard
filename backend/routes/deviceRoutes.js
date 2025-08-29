const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createDevice,
    getAllDevices,
    updateDevice,
    deleteDevice
} = require('../controllers/deviceController');

router.post('/', upload, createDevice);
router.get('/', getAllDevices);
router.put('/:id', upload, updateDevice);
router.delete('/:id', deleteDevice);

module.exports = router;