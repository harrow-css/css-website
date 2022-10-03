const contactModel = require('../models/contactModel')

// a function to get the questions from the mongo database
exports.postForm = async (req, res, next) => {
  try {
    const contactformdata = req.body.data

    contactModel.create(
      {
        name: contactformdata.name,
        email: contactformdata.email,
        message: contactformdata.message,
      },
      (err, result) => {}
    )

    res.status(200)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
