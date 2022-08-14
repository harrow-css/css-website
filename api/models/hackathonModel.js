const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HackathonSchema = new Schema(
  {
    hackathonName: {
      type: String,
    },
    hackathonHost: {
      type: String,
    },
    hackathonStartDate: {
      type: Date,
    },
    hackathonEndDate: {
      type: Date,
    },
    questions: {
      type: Map
    },
  },
    { timestamps: true }
);

module.exports = mongoose.model("Hackathon", HackathonSchema);
