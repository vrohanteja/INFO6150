const express = require('express');
const bodyParser = require('body-parser');

// use Router from Express, and export it using module.exports
const router = express.Router();
module.exports = router;

// Import database model
const Model = require('../models/model');
const { model } = require('mongoose');

// Importing Bcrypt
const bcrypt = require('bcrypt');
// higher salt rounds -> higher safety but slower, default 10
const saltRounds = 10;

// HTTPS methods
// router is taking the route as the first parameter. Then in the second parameter it's taking a callback.
// In the callback, we have a res and a req. res means sending response, and req means receiving request to our client like Postman, or the front-end page


//Post Method
// The function needs to be asynchronous to work, so using async for request - and await to save data.
router.post('/user/create', bodyParser.json(), async (req, res) => {

    // A combo of two strings, first name is 1-15 letters long, space, and last name 0-15 letters
    var regExFullName = /^[A-Za-z\s]{1,15}[\.]{0,1}[A-Za-z\s]{0,15}$/;
    // anystring@northeastern.edu
    var regExEmailId = /^[A-Za-z0-9._%+-]+@northeastern\.edu$/;
    // Atleast one number, atleast one alphabet, total alphanumeric string of length 8-16(?=.*\d.*)(?=.*[a-zA-Z].*)[0-9A-Za-z]+
    var regExPass = /^(?=.*\d.*)(?=.*[a-zA-Z].*)[a-zA-Z0-9]{8,16}$/;

    // Creating model before posting any new data to our database 
    const data = new Model({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    });

    // Try-catch for handling success messages and errors
    try {
        console.log("data is: ", data);
        // console.log("name is: ", data.fullname);
        // Validation
        // Comment Code Block Ctrl+K+C/Ctrl+K+U
        if (data.fullname == null || !data.fullname.trim().match(regExFullName)) {
            res.status(400);
            res.json("Invalid fullname, please enter alphabets only separated by space");
            return;
        }
        if (data.email == null || !data.email.trim().match(regExEmailId)) {
            res.status(400);
            res.json("Invalid email, please use a valid northeastern email id");
            return;
        }
        if (data.password == null || !data.password.trim().match(regExPass)) {
            res.status(400);
            res.json("Please recheck, and enter a valid 8-16 alpha numeric password");
            return;
        }

        // Encrypting password now
        //let passwordToEncrypt = req.body.password;

        //const encryptedData = new Model({
        //fullname: req.body.fullname,
        //email: req.body.email,
        //password: encryptedPass
        //});

        //const salt = await bcrypt.genSalt(saltRounds);
        //let encryptedPass = await bcrypt.hash(passwordToEncrypt, salt);

        // Salting function
        //bcrypt.genSalt(saltRounds, function (err, salt) {
        // Hasing function
        //bcrypt.hash(passwordToEncrypt, salt, function (err, hash) {
        // Store hash in database here
        //encryptedPass = hash;
        //console.log("encrypted pass:", encryptedPass)
        //});
        //});

        //console.log("encrypted pass2 :", encryptedPass)
        // Save, and store data. Sedn success.
        // const dataToSave = await data.save();
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
        console.log("data save successful");
    }
    // Catch and show whichever error is thrown with a response status 400
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Data not saved!");
    }
})



//Get all data method
router.get('/user/getAll', async (req, res) => {
    try {
        // Use the Model.find method to fetch all the data from the database, and then return json
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Get by ID Method
router.get('/getById/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Update by email Method
router.put('/user/edit', bodyParser.json(), async (req, res) => {
    try {
        const email1 = req.body.email;
        const fullname = req.body.fullname;
        const password = req.body.password;

        var regExFullName = /^[A-Za-z\s]{1,15}[\.]{0,1}[A-Za-z\s]{0,15}$/;
        var regExPass = /^(?=.*\d.*)(?=.*[a-zA-Z].*)[a-zA-Z0-9]{8,16}$/;

        if (fullname == null || !fullname.trim().match(regExFullName)) {
            res.status(400);
            res.json("Invalid fullname, please enter alphabets only separated by space");
            return;
        }
        if (password == null || !password.trim().match(regExPass)) {
            res.status(400);
            res.json("Please recheck, and enter a valid 8-16 alpha numeric password");
            return;
        }

        const updatedData = req.body;
        updatedData.email = email1;

        Model.findOneAndUpdate({ email: email1 }, req.body, function (e, user) {
            if (e) {
                console.log("error in update!!");
                res.status(400);
                res.send(e);
                return;
            } else {
                if (user == null) {
                    res.send("Email does not exist");
                    return;
                }
                console.log("User successfully updated ")
                res.send(user);
            }
        })

        // const options = { new: true };
        // const result = await Model.findByIdAndUpdate(
        //     id, updatedData, options
        // )
        // res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



// Delete by Email Method
// router.delete('/user/delete/:email', bodyParser.json(), async (req, res) => {
router.delete('/user/delete', bodyParser.json(), async (req, res) => {
    try {
        // const email = req.params,email;
        const email = req.body.email;
        if (email == null) {
            res.send({ message: "Please enter an email to delete" });
            return;
        }
        console.log(req.body);

        // Dont have to send the email in body if i just send it as a parameter in URL itself. Preferred.
        // Model.findOneAndDelete({"email":req.params.email},function(err,user){
        Model.findOneAndDelete({ "email": req.body.email }, function (err, user) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                if (user == null) {
                    res.send("Email does not exist");
                    return;
                }
                console.log("user successfully deleted ")
                res.send(user);
            }
        })

        //const data = await Model.findByIdAndDelete(email)
        //res.send(`Entry with the email id: ${data.email} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/user/login', async (req, res) => {
    try {
        console.log(req.body);
        let emailDelete = req.body.email;
        let passwordDelete = req.body.password;

        const user = await Model.findOne({ email: emailDelete });
        console.log("Login User: ")
        console.log(user);
        const isMatch = await user.isValidPassword(passwordDelete);

        if (!isMatch) {
            try {
                res.status(400);
                res.json({ "message": "Invalid password!" });
                return res.send();
            } catch (error) {
                return error;
            }
        } else {
            return res.status(200).json({
                "message": "login success"
            });
        }
    } catch (error) {
        res.status(404).json({ "message": "This user doesn't exist" });
        return res.send();
    }
})