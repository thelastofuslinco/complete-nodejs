const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: 'lincolnskyrim@gmail.com',
      subject: `Thank you ${name} for accessing my page`,
      text: `Welcome to my webpage, ${name}. Stay tuned for new updates and follow me on social media.
      github: https://github.com/thelastofuslinco
      linkedin: https://www.linkedin.com/in/lincoln-duarte-39438815a/
      `
    })
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

const sendCancelationEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: 'lincolnskyrim@gmail.com',
      subject: `Sorry to see you go!`,
      text: `Goodby, ${name}. I hope to see you back sometime soon.`
    })
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = { sendWelcomeEmail, sendCancelationEmail }
