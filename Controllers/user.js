const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'yoursecretkey';

const User = require('../Models/user');

//create user signup
exports.userSignUp = async (req, res) => {
  try {
    // Generate a salt to use for password hashing
    const salt = await bcrypt.genSalt(10);

    // Check if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const emailExists = await Student.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists!!!" })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user object with the hashed password
    const newUser = new User({
      userame: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Data saved successfully", user: savedUser });

  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

//user login
exports.userLogin = (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(user => {
    
    //check if user exists
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        //create JWT payload
        const payload = { id: user.usr_id, name: user.username, email: user.email };
        
        //sign token
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    });
  });
};

//get all users
exports.getUsers = (req, res) => {
  User.find().then(users => {
    res.json(users);
  });
};
// get user by id
exports.getUserById = (req, res) => {
  User.findById(req.params.usr_id).then(user => {
    res.json(user);
  });
};

// delete user by id
exports.deleteUserById = (req, res) => {
  User.findByIdAndDelete(req.params.usr_id).then(() => {
    res.json({ message: "User deleted successfully" });
  });
};

// update user by id
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.usr_id, req.body).then(() => {

    User.findById(req.params.usr_id).then(user => {
      res.json(user);
    });
  });
};

exports.verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.json({ authenticated: false });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.json({ authenticated: false });
    }
    Student.findById(decoded.id)
      .then(student => {
        if (!student) {
          return res.json({ authenticated: false });
        }
        return res.json({ authenticated: true });
      })
      .catch(err => {
        return res.json({ authenticated: false });
      });
  });
};