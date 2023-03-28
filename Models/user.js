const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const UserSchema = new Schema({
	usr_id:{
		type:Number,
		required:true,
		unique:true
	},
	username: {
		type: String,
		required: [true, 'Please add your fullname'],
	},
    email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
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
UserSchema.plugin(autoIncrement.plugin, {
  model: "user", // collection or table name in which you want to apply auto increment
  field: "usr_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('user', UserSchema);