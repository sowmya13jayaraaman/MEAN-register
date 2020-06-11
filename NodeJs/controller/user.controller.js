const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');


router.post('/register', (req,res,next) =>{
    var u = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    });
    // var u = new User();
    // u.fullName = req.body.fullName;
    // u.email = req.body.email;
    // u.password = req.body.password;

    u.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { 
            if(err.code == 11000){
                res.status(422).send(['Duplicate email address']);
            }
            else{
                return next(err);            //defined in app.js....continue the request by passing the err object
            }
         }
    });


});


module.exports = router;