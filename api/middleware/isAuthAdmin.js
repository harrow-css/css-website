// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

// module.exports = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     const error = new Error("Not authenticated.");
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = authHeader.split(" ")[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, "expressnuxtsecret");
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error("Not authenticated.");
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedToken.userId;

//   console.log(req.userId);

//   // check if user is admin from the database
//   userModel
//     .findById(req.userId)
//     .then((user) => {
//       if (!user) {
//         const error = new Error("Not authenticated.");
//         error.statusCode = 401;
//         throw error;
//       }
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "expressnuxtsecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
