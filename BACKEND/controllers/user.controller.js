const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { default: getDataUri } = require("../utils/DataUri");
const { default: cloudinary } = require("../utils/cloudinary");

//register user in wesite
const register = async (req, res) => {
  //user ko register karayaga
  try {
    const { fullname, email, phonenumber, password, role } = req.body;
    // console.log(fullname, email, phonenumber, password, role);
    if (!fullname || !email || !phonenumber || !password || !role) {
      return res
        .status(404)
        .json({ message: "somthing is mising", success: false });
    }
    console.log("req.body is:", req.body);
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email }); //check karega ki email pahala se exist to nahi kar raha
    if (user) {
      return res
        .status(400)
        .json({ message: "user already exist with email", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //password ko hash from me karega//in bcript we have p(password,salt value(10))
    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    console.log("req.body is:", req.body);

    return res
      .status(201)
      .json({ message: "account created succesfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(404)
        .json({ message: "somthing is missing", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "incorrect password and email", success: false });
    }
    const ispasswordmatch = await bcrypt.compare(password, user.password); //chek password to hash password
    if (!ispasswordmatch) {
      //chek password is match or not
      return res
        .status(404)
        .json({ message: "incorrect password and email", success: false });
    }
    //chek role is correct  or not
    if (role !== user.role) {
      return res.status(404).json({
        message: "Account does not match with current role",
        success: false,
      });
    }
    //token generate karuga
    const tokenData = {
      userId: user._id,
    };
    const token = await JWT.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const userData = {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true, // ✅ Needed for HTTPS (Vercel/Render)
        sameSite: "None",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

//logout
const logout = (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({ message: `logout successfully`, success: true });
  } catch (error) {
    console.log(error);
  }
};


const updateprofile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;
    // console.log(fullname, email, phonenumber, bio, skills);

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // console.log("Cloudinary resume URL:", cloudResponse.secure_url);

    // Convert skills to array if provided
    let skillsArray = [];
    if (skills) {
      try {
        skillsArray = JSON.parse(skills);
      } catch (e) {
        return res
          .status(400)
          .json({ message: "Invalid skills format", success: false });
      }
    }
    const userId = req.id;
    // Authentication middleware should set user ID
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // Initialize profile if not present
    if (!user.profile) {
      user.profile = {};
    }

    // Update fields only if they are provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Handle file upload (if file exists)
    if (cloudResponse) {
      // Example: If you're uploading a resume
      user.profile.resume = cloudResponse.secure_url; // save the cloudanary url
      user.profile.resumeOriginalName = file.originalname; // save the original file name
    }

    // Save the updated user
    await user.save();

    // Prepare response data
    const updatedUser = {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    // Respond with the updated user data
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = { register, login, logout, updateprofile };
