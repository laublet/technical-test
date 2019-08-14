import randomize from 'randomatic';

import constants from '@/config/constants';
import sgMail from '../../node_modules/@sendgrid/mail'; //'@' messes with babel prefix...

sgMail.setApiKey(constants.MAIL_API_KEY);


function newsLetter(email) {
  const randomID = randomize('*', 128);
  const msg = {
    to: `${email}`,
    from: 'MyAwesomeApp@example.com',
    subject: 'Random ID',
    text: `Here is your random ID: ${randomID}`,
    html: `<strong>Here is your random ID: ${randomID}</strong>`,
  };
  console.log('newsLetter', constants.MAIL_API_KEY);

  // To send the Email
  // sgMail.send(msg);
}

export default newsLetter;
