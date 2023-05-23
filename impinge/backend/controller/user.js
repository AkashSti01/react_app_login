const Users = require("../model/userModel");
const User = require("../model/userData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class userController {
  // Controller for gets users details
  static getUser = async (req, res) => {
    console.log(
      "req.body.page",
      req.body.page,
      "req.body.limit ",
      req.body.limit,
      "req.body.keyword",
      req.body.keyword
    );
    console.log("--------------->", req.body.status);
    try {
      const keyword = req.body.keyword.keysearch;
      const status = req.body.status;
      console.log("keyword", keyword);
      if (!keyword && status === "All") {
        const page = req.body.page ? req.body.page : 1;
        const limit = req.body.limit ? req.body.limit : 10;

        const skip = (page - 1) * limit;

        const total = await User.countDocuments();
        // Get the user data from userSchema according
        const user = await User.find()
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });
        res.status(200).json({
          status: "Success",
          data: user,
          count: total,
        });
      } else {
        if (keyword) {
          const total = await User.countDocuments();
          // Get the user data from userSchema according
          const user = await User.find({ email: keyword });
          res.status(200).json({
            status: "Success",
            data: user,
          });
        } else if (status) {
          const total = await User.countDocuments();
          // Get the user data from userSchema according
          const user = await User.find({ status: status });
          res.status(200).json({
            status: "Success",
            data: user,
          });
        }
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        status: "failure",
        msg: "Something went wrong!",
        data: [],
      });
    }
  };

  static Register = async (req, res) => {
    console.log("------->", req.body);
    try {
      const Req_Data = req.body;
      if (
        Req_Data.firstName &&
        Req_Data.lastName &&
        Req_Data.email &&
        Req_Data.password
      ) {
        const user = await Users.findOne({ email: Req_Data.email });
        console.log("******>", user);
        if (!user) {
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(Req_Data.password, salt);
          const token = jwt.sign(Req_Data.email, process.env.SECRET_KEY);
          await Users.create({
            firstname: Req_Data.firstName,
            lastname: Req_Data.lastName,
            email: Req_Data.email,
            password: hashPassword,
            access_token: token,
            file: Req_Data.file,
          });
          res.status(200).json({
            status: "Success",
            msg: "Registration Successful",
            token: token,
          });
        } else {
          res
            .status(201)
            .json({ status: "Success", msg: "User already exist!" });
        }
      } else {
        res
          .status(202)
          .json({ status: "Success", msg: "All field are required!" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static userLoginController = async (req, res) => {
    console.log("-------->", req.body);
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await Users.findOne({ email: email });
        if (!user) {
          res.send({
            status: "Failed",
            message: "Please register before login.",
          });
        } else {
          const userpassword = await bcrypt.compare(password, user.password);
          if (password && userpassword) {
            res.send({
              status: "Success",
              message: "Login successfully...",
            });
          } else {
            res.send({ status: "Failed", message: "Password are incorrect" });
          }
        }
      } else {
        res.send({ status: "Failed", message: "All field are required." });
      }
    } catch (error) {
      console.log("err", error.message);
    }
  };

  static Logout = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(204);
      const user = await Users.findOne({ refresh_token: refreshToken });
      if (!user) return res.sendStatus(204);
      const userId = user.id;
      await Users.findByIdAndUpdate(
        { refresh_token: null },
        {
          id: userId,
        }
      );
      res.clearCookie("refreshToken");
      return res.sendStatus(200);
    } catch (error) {
      res.send({ status: "Failed", message: error.message });
      console.log("first====>", error);
    }
  };
}

module.exports = userController;
