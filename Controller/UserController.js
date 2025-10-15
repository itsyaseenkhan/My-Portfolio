import catchAsyncError from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { User } from "../models/UserSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import sendEmail from  "../utils/sendEmail.js";
import crypto from "crypto";

// REGISTER
export const register = catchAsyncError(async (req, res, next) => {
  console.log("Incoming POST request to /api/v1/UserRouter/register");
  console.log("req.files:", req.files);

  const avatar = req.files?.avatar || req.files?.Avatar;
  const resume = req.files?.resume || req.files?.Resume;

  if (!avatar || !resume) {
    return next(new ErrorHandler("Avatar and Resume are required!", 400));
  }

  // Upload avatar
  const avatarUpload = await cloudinary.uploader.upload(avatar.tempFilePath, {
    folder: "avatar",
  });

  // Upload resume
  const resumeUpload = await cloudinary.uploader.upload(resume.tempFilePath, {
    folder: "resume",
  });

  const {
    fullName,
    email,
    Phone,
    AboutMe,
    Password,
    portfolioURL,
    githubUrl,
    instagramURL,
    linkedInURL,
    facebookURL,
    typewriterText // <-- NEW FIELD
  } = req.body;

  const newUser = await User.create({
    fullName,
    email,
    Phone,
    AboutMe,
    Password,
    portfolioURL,
    githubUrl,
    instagramURL,
    linkedInURL,
    facebookURL,
    typewriterText, // <-- SAVE IT HERE
    avatar: {
      public_id: avatarUpload.public_id,
      url: avatarUpload.secure_url,
    },
    resume: {
      public_id: resumeUpload.public_id,
      url: resumeUpload.secure_url,
    },
  });

  generateToken(newUser, "User Registered!", 201, res);
});



export const login = catchAsyncError(async (req, res, next) => {
    const { email, Password } = req.body;
    if (!email || !Password) {
      return next(new ErrorHandler("Provide Email And Password!", 400));
    }
    const user = await User.findOne({ email }).select("+Password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password!", 404));
    }
    const isPasswordMatched = await user.comparePassword(Password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password", 401));
    }
    generateToken(user, "Login Successfully!", 200, res);
  });


  export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out!",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    Phone: req.body.Phone,
    AboutMe: req.body.AboutMe,
    typewriterText: req.body.typewriterText,
    githubUrl: req.body.githubUrl,
    instagramURL: req.body.instagramURL,
    portfolioURL: req.body.portfolioURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
  };

  // Handle avatar update
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id); // ✅ FIXED

    const profileImageId = user.avatar?.public_id;
    if (profileImageId) {
      await cloudinary.uploader.destroy(profileImageId);
    }

    const newProfileImage = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "AVATARS",
      }
    );

    newUserData.avatar = {
      public_id: newProfileImage.public_id,
      url: newProfileImage.secure_url,
    };
  }

  // Handle resume update
  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);

    const resumeFileId = user.resume?.public_id;
    if (resumeFileId) {
      await cloudinary.uploader.destroy(resumeFileId);
    }

    const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
      folder: "RESUME",
    });

    newUserData.resume = {
      public_id: newResume.public_id,
      url: newResume.secure_url,
    };
  }

  // Update the user
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user,
  });
});


export const updatePassword = catchAsyncError(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const user = await User.findById(req.user.id).select("+Password");
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Fill All Fields.", 400));
  }
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Current Password!"));
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler("New Password And Confirm New Password Do Not Match!")
    );
  }
  user.Password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated!",
  });
});


export const getUserForPortfolio = catchAsyncError(async (req, res, next) => {
  const id = "688bef053d82aabe6843474e";
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});


export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.DASHBOARD_URL}/Password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:\n\n ${resetPasswordUrl}\n\n If you did not request this please Ignore this Message .`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Password Recovery`,
      message,
    });
      
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has expired", 400));
  }

  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(new ErrorHandler("Please enter password and confirm password", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password and confirm password do not match", 400));
  }

  user.Password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // ✅ No auto-login
  res.status(200).json({
    success: true,
    message: "Password reset successfully. Please login.",
  });
});

