const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema

const visitorSchema = new mongoose.Schema({
    visitor_id:{
		type: Number,
		required:true
	  },
    visitorCount: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });

autoIncrement.initialize(mongoose.connection);
visitorSchema.plugin(autoIncrement.plugin, {
  model: "visitor", // collection or table name in which you want to apply auto increment
  field: "visitor_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('visitor', visitorSchema, 'visitor');   // exporting the model