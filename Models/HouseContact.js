const mongoose = require("mongoose");
const schema = mongoose.Schema;

const autoIncrement = require("mongoose-auto-increment");

const contactSchema = new schema({
    contact_id: {
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
    },
    phone:{
        type:Number,
    }
})

autoIncrement.initialize(mongoose.connection);
contactSchema.plugin(autoIncrement.plugin, {
  model: "contact", // collection or table name in which you want to apply auto increment
  field: "contact_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model('contactUs',contactSchema,'contactUs');
