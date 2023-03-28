const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./Routes/index');

const app = express();
const PORT = process.env.PORT || 1438;
const uri = process.env.MONGO_URI;


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
});

app.use('/api', routes);

app.get('/', (req, res) => {
	res.send('Welcome to Tapaswi Property Management System');
});

 // Database connection
 const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

app.listen(PORT, async () => {
    // mongoose.connect(mongourl);
	mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	mongoose.set('strictQuery', true);
    console.log(`Node Server started on port ${PORT}`)
})