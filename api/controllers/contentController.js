const contentModel = require("../models/contentModel");

// a function to get the questions from the mongo database
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await contentModel.find();
    res.status(200).json(questions);
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
