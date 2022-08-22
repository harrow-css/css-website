const express = require("express");
const router = express.Router();
const hackathonController = require("../controllers/hackathonController");

router.get("/getall", hackathonController.getHackathons);
router.get("/getone/:hackathonId", hackathonController.getHackathon);
router.get("/getonequestion/:hackathonId/:questionId", hackathonController.getHackathonQuestion);

module.exports = router;