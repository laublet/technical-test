// Work in progress
// Should probably use redis

import catchError from '@/services/error';
import schedule from 'node-schedule';

import newsLetter from '@/services/newsletter';
import User from './user.model';

// const dateOne = new Date(2019, 7, 14, 9, 48, 1); //user for specific date. Warning january=0
const dateOne = '* * 8 1-12 0'; //Every first monday of the month 8am
const dateTwo = '* * 8 * 0'; //Every monday 8am
const test = '1-59 * * * * *'; // For testing. Deactivate email sending beforehand.
// let userEmail = 'loic.aublet@gmail.com';

function getEmail() {
  return new Promise((resolve, reject) => {
    const userEmail = 'loic.aublet@gmail.com';

    resolve(userEmail);
  });
}

const job = schedule.scheduleJob(test, function() {
  //Email need to be fetched in the job
  console.log('ici');
  getEmail().then(userEmail => {
    newsLetter(userEmail);
  });
});

function email() {
  const id = req.params.id || req.user._id;
  console.log('ici', id);

  job; // Start the job

  // Check if newsletter is activated first
  User.findById(id)
  .then(user => {
    if (!user) return 'user not found';
    if (user.newsletterActivated) {
      userEmail = user.email;
      job; // Start the job
      } else {
        return 'User newsletter deactivated';
      }
    })
    .catch(err => {
      next(catchError(err));
    });
}

export default email;
