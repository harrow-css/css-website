const hackathonModel = require("../models/hackathonModel");

// a function to get the questions from the mongo database
exports.getHackathons = async (req, res, next) => {
  try {
    const hackathons = await hackathonModel.find({}, 'hackathonName hackathonStartDate hackathonEndDate hackathonImage hackathonHost').sort([['date', -1]]);
    res.status(200).json(hackathons);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getHackathon = async (req, res, next) => {
  // get the question id from the request
  const hackathonId = req.params.hackathonId;
  try {
    const hackathon = await hackathonModel.findById(hackathonId);
    res.status(200).json(hackathon);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
