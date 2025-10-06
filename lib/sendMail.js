import nodemailer from "nodemailer";

export const sendMail = async (subject, RadioReceiver, body) => {
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const options = {
    from: `"Sachin Singh" <${process.env.NODEMAILER_EMAIL}>`,
    to: RadioReceiver,
    subject: subject,
    html: body,
  };

  try {
    await transporter.sendMail(options);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error sending email",
    };
  }
};
