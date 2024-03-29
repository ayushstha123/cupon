const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender.js');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});


async function sendVerificationEmail(email, otp) {
    try {
      const mailResponse = await mailSender(
        email,
        "Verification Email",
        `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`
      );
      console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }
  otpSchema.pre("save", async function (next) {
    if (this.isNew) {
      await sendVerificationEmail(this.email, this.otp);
    }
    next();
  });
const OTP = mongoose.model("OTP", otpSchema);
module.exports =  OTP;
