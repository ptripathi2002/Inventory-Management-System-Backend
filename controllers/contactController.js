const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error("User Not Found,Please Sign Up");
  }
  //Validation

  if (!subject || !message) {
    res.status(400);
    throw new Error("Please Add Subject and Message");
  }

  const send_to = process.env.EMAIL_USER;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = user.email;

  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Sent Successfully" });
  } catch (error) {
    res.status(400);
    throw new Error("Email Not Sent, Please Try Again");
  }
});

module.exports = { contactUs };
