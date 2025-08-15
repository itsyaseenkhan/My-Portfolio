import { Message } from "../models/messageSchema.js";
import  catchAsyncError  from "../middlewares/catchAsyncError.js";
import{ ErrorHandler} from "../middlewares/error.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { senderName, Subject, message, email } = req.body;

  if (!senderName || !Subject || !message || !email) {
    return next(new ErrorHandler("Please fill the entire form!", 400));
  }

  const existingMessage = await Message.findOne({ email });
  if (existingMessage) {
    return next(new ErrorHandler("This email has already submitted a message.", 409));
  }

  const data = await Message.create({ senderName, Subject, message, email });

  res.status(201).json({
    success: true,
    message: "Message Sent",
    data,
  });
});


export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted!", 400));
  }
  await message.deleteOne();
  res.status(201).json({
    success: true,
    message: "Message Deleted",
  });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(201).json({
    success: true,
    messages,
  });
});
