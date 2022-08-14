const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");

router.get("/getall", hackathonController.getHackathons);
router.get("/question", hackathonController.getQuestion);

module.exports = router;
