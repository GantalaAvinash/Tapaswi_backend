const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const StudentDetailsSchema = new Schema({
	std_id:{
		type:Number,
		required:true,
		unique:true
	},
	fullName: {
		type: String,
		required: [true, 'Please add your fullname'],
	},
	rollNumber: {
		type: String,
		required: [true, 'Please add your roll number'],
		unique:true
	},
    email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
	},
    batchYear: {
		type: Number,
		required: [true, 'Please add an batch year'],
	},
    phoneNumber: {
		type: String,
		required: [true, 'Please add your number'],
	},
    password: {
		type: String,
		required: [true, 'Please add your number'],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});


autoIncrement.initialize(mongoose.connection);
StudentDetailsSchema.plugin(autoIncrement.plugin, {
  model: "studentdetails", // collection or table name in which you want to apply auto increment
  field: "std_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('studentdetails', StudentDetailsSchema);