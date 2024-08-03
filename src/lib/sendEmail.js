import User from "@/app/models/User";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

const sendEmail = async ({ emailAddress, emailType, userId }) => {
  try {
    const convertedId = userId.toString();
    const hashedToken = await bcryptjs.hash(convertedId, 10);
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 5);

    const updateUserInformation = emailType === "emailValidation" ? {
        verifyToken: hashedToken,
        verifyTokenExpiry: tokenExpiry,
    } : {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: tokenExpiry,
    }

    await User.updateOne(
      { _id: userId },
      { $set: updateUserInformation }
    );

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: false, // Try changing this to false
      tls: {
        minVersion: "TLSv1.2", // Explicitly set TLS version
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const tokenLink = `${process.env.NEXTAUTH_URL}api/users/verify?type=${emailType}&token=${hashedToken}`

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: emailAddress, // list of receivers
      subject: "Validation email", // Subject line
      html: `Verify this link ${tokenLink}`, // html body
  }

    const emailSendInfo = await transporter.sendMail(mailOptions);
    console.log("emailSendInfo", emailSendInfo);

    return emailSendInfo;
  } catch (error) {
    console.error("Error in sendEmail:", error);
    throw error;
  }
};

export default sendEmail;
