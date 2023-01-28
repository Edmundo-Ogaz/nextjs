export default async function (req, res) {
    
    let nodemailer = require('nodemailer')
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    const mailData = {
      from: 'e.jeshua@gmail.com',
      to: 'edmundo.ogaz@gmail.com',
      subject: `Message From xxx`,
      text: "xxx | Sent from: xxx",
      html: `<div>xxx</div><p>Sent from:
      xxxx</p>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.error('mailer error', err)
      else
        console.log('mailer response', info)
    })
    res.status(200)
  }