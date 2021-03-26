const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

mongoose.connect('mongodb://localhost/quiz_app',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', ()=>{
    console.log("MongoDB is Connected");
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(morgan('tiny'));
app.use('/',routes);


app.listen(PORT,console.log(`Server is running at ${PORT}`));