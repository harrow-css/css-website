const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

router.get("/", contentController.getQuestions);
router.get("/question", contentController.getQuestion);

module.exports = router;
