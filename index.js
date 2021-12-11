const nodemailer = require(`nodemailer`);
require("dotenv").config();
const publicIp = require("public-ip");

const getIpAddress = async () => {
  return await publicIp.v4({ fallbackUrls: ["https://ifconfig.co/ip"] });
};
async function sendMail({ to, text, subject, html }) {
  let transporter = nodemailer.createTransport({
    service: `gmail`,
    auth: {
      user: process.env.EMAILID, // generated ethereal user
      pass: process.env.PASSWD, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: process.env.EMAILID, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html,
  });
  console.log(`Message sent: %s`, info.messageId);
}

(async () => {
  // let previousIp;
  setInterval(async () => {
    try {
      const ip = await getIpAddress();
      // console.log(`IP changed form ${previousIp} => ${ip}`);
      // previousIp = ip;
      await sendMail({
        to: `gondilvivek@gmail.com`,
        subject: `Mail from dev branch`,
        text: `Your IP is  ${ip}`,
      }).catch(console.error);
    } catch (error) {
      console.log(error);
    }
  }, 5000);
})();
