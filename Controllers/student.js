const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'yoursecretkey';

const Student = require('../Models/students');


//add confirm password

/// Inserting SignUp Details of Student
exports.studentsignUp = async(req, res) => {
    try {
      // Generate a salt to use for password hashing
      const salt = await bcrypt.genSalt(10);
  
      // Check if the password and confirm password match
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const emailExists = await Student.findOne({ email: req.body.email });
      if(emailExists) {
        return res.status(400).json({message: "Email already exists!!!"})
      }
  
      const rollNumberExists = await Student.findOne({ rollNumber: req.body.rollNumber });
      if(rollNumberExists) {
        return res.status(400).json({message: "Roll number already exists!!!"})
      }


      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      // Create a new student object with the hashed password
      const newStudent = new Student({
        fullName: req.body.fullName,
        rollNumber: req.body.rollNumber,
        email: req.body.email,
        batchYear: req.body.batchYear,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
      });
  
      // Save the student to the database
      const savedStudent = await newStudent.save();
      res.status(201).json({ message: "Data saved successfully", student: savedStudent });
  
    } catch (err) {
      // Handle errors
      res.status(500).json({ message: err.message });
    }
  };
 
  

exports.studentlogin =(req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  Student.findOne({ email: email }).then(student => {

      //check if student exists
      if(!student){
          return res.status(404).json({message: "Email not found"});
      }

      //check password
      bcrypt.compare(password, student.password).then(isMatch => {
          if(isMatch){
              //student matched
              //create JWT payload

              const payload ={ id: student.std_id, name: student.fullName, email: student.email, phone: student.phoneNumber, rollNumber: student.rollNumber, batchYear: student.batchYear};

              //sign token
              jwt.sign(
                  payload,
                  {expiresIn: 3600},
                  (err, token) => {
                  res.json({ success: true, token: "Bearer" + token, payload});
              });

              
          } else {
              return res
              .status(400)
              .json({ message: "Password Incorrect"})
          }
      });
  });
};

exports.getStudents = (req, res) => {
  Student.find().then(
    response=>{
        res.status(200).json({message:"Sucessfull fetched Students!",student:response});
    }
).catch(
    err =>{
        res.status(500).json({message:"Error",error:err});
    }
);
}

exports.getStudentById = async(req, res, next) => {
  try {
		const { std_id } = req.params;

		const studentList = await Student.findOne({
			std_id: std_id,
		});

		res.status(200).json({
			status: true,
			student: studentList,
		});
	} catch (error) {
		next(error);
	}
}

exports.getstudentbybatch = async (req, res, next) => {
	try {
		const { batchYear } = req.params;

		const studentsList = await Student.find({
			batchYear: batchYear,
		});

		res.status(200).json({
			status: true,
			NoOfstudents: studentsList.length,
			student: studentsList,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteStudent = async(req, res ,next) => {
    // Find the student by their std_id and delete them
    const { std_id } = req.params;
    
    Student.findOneAndDelete(
      { std_id }
  ).then(_res => {
      res.status(200).json({
          status: true,
          message: `Student object ${std_id} deleted successfully`
      })
  }).catch(error => {
      next(error);
  })
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