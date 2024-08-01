const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const hbs = require("nodemailer-express-handlebars");

// configure the handlebars plugins

const handlebarOptions = {
  viewEngine: {
    defaultLayout: false
  },
  viewPath: "./views/",
};

async function createPasswordEmailService(user1, user2, isParent) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.use("compile", hbs(handlebarOptions));

  const userEmail = user1.contactInfo.email;

  token = jwt.sign({ email: userEmail }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  resetLink = `http://localhost:3000/reset-password/?authToken=${token}`;

  async function main() {
    const info = await transporter.sendMail({
      from: '"College Mastermind" <noreply@collegemastermind.com>',
      to: userEmail,
      subject: "Welcome to College Mastermind!",
      // html: `<p>Hi ${user.fullName},</p> <p>Thank you for registering with College Mastermind. Please click the link below to reset your password:</p> <a href=${resetLink}>Reset Password</a>`,
      template: "createPassword",
      context: {
        studentName: isParent ? user2.fullName : user1.fullName,
        parentName: isParent ? user1.fullName : user2.fullName,
        resetLink: resetLink,
      },
    });

    console.log("Message sent: %s", info);

    return info;
  }

  main().catch(console.error);
}

module.exports = createPasswordEmailService;
