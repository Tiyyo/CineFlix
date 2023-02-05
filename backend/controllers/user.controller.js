
const UserModel = require("../models/user.models");

module.exports.createUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    if (!(username && firstName && lastName && email && password)) {
      res.status(400).send("All input is required");
    }
    const emailUsed = await UserModel.findOne({ email });

    if (emailUsed) {
      return res.status(409).send("User already exist. Please Login");
    }

    const usernameUsed = await UserModel.findOne({ username });

    if (usernameUsed) {
      return res.status(409).send("This username is already taken");
    }
    encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowercase(),
      password: encryptedUserPassword,
    });

    const token = jwt.sign({ user_id: user_id, email }, process.env.TOKEN_KEY, {
      expriesIn: "5h",
    });

    user.token = token;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body
    if(!(email && password)) {
      res.status(400).send('All inputs are required')
    }

    const user = await User.findOne({email})

    if(user && ( await bycrypt.compare(password, user.password))){
      const token = jwt.sign({user_id: user_id, email}, process.env.TOKEN_KEY, {expriresIn : '5h'})

      user.token = token ;

      return res.status(200).json(user)
    }
    return res.status(400).send('Invalid Credentials')
  } catch (error) {
    console.log(error);
  }
};
