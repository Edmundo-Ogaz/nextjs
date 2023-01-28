export default function (req, res) {
    
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: 'e.jeshua@gmail.com',
        pass: 'edmundogmail',
      },
      secure: false,
    })
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