const express = require('express');
const user = require('../models/user');

const router = express.Router();

router.get('/userdata',(req,res) =>{
    user.find({ })
    .then((data) =>{
        console.log("Data : ",data);
        res.json(data);
    })
    .catch((error) =>{
        console.log("Error in api.js1");
    });
});
router.post('/signin', (req, res) => {
    user.find({
        email: req.body.email,
        password: req.body.password
    }, (error, previousUser) => {
        if (error) {
            return res.send({
                success: false,
                message: 'Server error !!'
            })
        }
        else if (previousUser.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid Email or Password !!'
            })
        }
        else {
            return res.send({
                success: true,
                message: 'signin successful !!'
            })
        }
    })
})
router.post('/userdata',(req,res) =>{
    console.log('Body : ', req.body);

    const data = req.body;
    const newUser = new user(data);
    newUser.save((error) =>{
        if(error){
            res.status(500).json({msg : "Error in Api.js"});
        }
        else{
            res.json({
                msg: "Data has been saved"
            });
        }
    })



});

module.exports = router;