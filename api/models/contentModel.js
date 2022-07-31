const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentSchema = new Schema(
  {
    questionName: {
      type: String,
    },
    questionNumber: {
      type: String,
    },
    questionText: {
      type: String,
    },
    questionDetails: {
      deadline: { type: Date },
      creator: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentSchema);
