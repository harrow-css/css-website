const hackathonModel = require("../models/hackathonModel");

// a function to get the questions from the mongo database
exports.getHackathons = async (req, res, next) => {
  try {
    const hackathons = await hackathonModel.find({}, 'hackathonName hackathonStartDate hackathonEndDate');
    res.status(200).json(hackathons);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getQuestion = async (req, res, next) => {
  // get the question id from the request
  const questionId = req.params.questionId;
  try {
    const question = await contentModel.findById(questionId);
    res.status(200).json(question);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
