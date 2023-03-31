const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

// Registering the City Schema

const HouseSchema = new Schema({
    house_id:{
		type: Number,
		required:true
	},
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sliderImages: [{ imageUrl: String }],
    country: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    surface: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    },  
)

autoIncrement.initialize(mongoose.connection);
HouseSchema.plugin(autoIncrement.plugin, {
  model: "house", // collection or table name in which you want to apply auto increment
  field: "house_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('house', HouseSchema, 'house');   // exporting the model