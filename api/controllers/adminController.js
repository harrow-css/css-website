const contentModel = require("../models/contentModel");

// a function to write to the mongo database using the content schema
exports.createQuestion = async (req, res, next) => {
  try {
    const content = new contentModel({
      questionName: req.body.questionName,
      questionNumber: req.body.questionNumber,
      questionText: req.body.questionName,
      questionDetails: {
        deadline: req.body.questionDetails.deadline,
        creator: req.body.questionDetails.creator,
      },
    });

    const result = await content.save();
    res.status(200).json({
      message: "Question added",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
