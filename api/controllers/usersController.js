const userModel = require('../models/usersModel')

// a function to get the questions from the mongo database
exports.postUser = async (req, res, next) => {
  try {
    const userdata = req.body.data

    userModel.create(
      {
        family_name: userdata.family_name,
        given_name: userdata.given_name,
        _id: userdata.oid,
        email: userdata.upn,
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
