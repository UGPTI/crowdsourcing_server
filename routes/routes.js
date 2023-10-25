const express = require('express');
const app = express();
const router = express.Router();
const mapController = require("../controller/mapController");


router.post('/saveData' , mapController.saveData);

module.exports = router;