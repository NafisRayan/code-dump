const router = require("express").Router();
const nodemailer = require("nodemailer");

router.get("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.acumbamail.com",
    port: 587,
    auth: {
      user: "erin@collegemastermind.com",
      pass: "adc237e4bac148fdb209edc787bb9f4e",
    },
  });

  async function main() {
    const info = await transporter.sendMail({
        from: '"Example Team" <noreply@collegemastermind.com>',
        to: 'yashbarman3010@gmail.com',
        subject: 'Test Email',
        text: 'Hello World',

    });

    console.log("Message sent: %s", info.messageId);
    console.log(info);
  }

  main().catch(console.error);
});

module.exports = router;
