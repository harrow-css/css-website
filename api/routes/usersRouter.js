const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/postnewuser", usersController.postUser);

module.exports = router;
