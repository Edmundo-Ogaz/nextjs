export default async function (req, res) {
    
    let nodemailer = require('nodemailer')
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.mandrillapp.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'Applicant', // generated ethereal user
        pass: 'md-FtZvghP5tGebjzw6vapKYg', // generated ethereal password
      },
    });
    const mailData = {
      from: 'Applicant',
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