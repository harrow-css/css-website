const express = require("express");
const router = express.Router();
const isAuthAdmin = require("../middleware/isAuthAdmin");
const adminController = require("../controllers/adminController");

router.post("/createquestion", isAuthAdmin, adminController.createQuestion);

module.exports = router;
