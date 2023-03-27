const bcrypt = require("bcrypt");

const userSchema = require("./UserSchema");
const verifyEmail = (email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  
    return pattern.test(email);
  };
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.status(400).json({
        status: false,
        message: `All fields are required`,
      });
      return;
    }
    if (!verifyEmail(email)) {
      res.status(400).json({
        status: false,
        message: `Email is not valid`,
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
        name,
        email,
        password: hashedPassword,
    
      });

      newUser
      .save()
      .then((user) => {
        res.status(201).json({
          status: true,
          message: "User successfully created",
          data: user,
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Error creating user",
        error: err,
      });
    });
};