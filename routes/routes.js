const express = require('express');
const app = express();
const router = express.Router();
const mapController = require("../controller/mapController");


router.get('/getDreList' , mapController.getDreList);
router.get('/readAndUpdateDreList' , mapController.readAndUpdateDreList);

module.exports = router;