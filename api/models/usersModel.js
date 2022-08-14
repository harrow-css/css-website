const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    family_name: { type: String },
    given_name: { type: String },
    _id: { type: String },
    email: { type: String }
  }
);

module.exports = mongoose.model("User", UsersSchema);
