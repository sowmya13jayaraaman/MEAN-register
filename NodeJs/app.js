require('./config/config');
require('./models/db');

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

var userController =  require('./controller/user.controller');

var app = express();

app.use(bodyparser.json());
app.use(cors());
app.use('/auth',userController);


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server listenining in port : ${process.env.PORT}`);
});
