const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/newcontactform", contactController.postForm);

module.exports = router;
