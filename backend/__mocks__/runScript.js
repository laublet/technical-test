function runScript() {
  console.log('here');
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve()
      // users[userID]
      //   ? resolve(users[userID])
      //   : reject({
      //       error: 'User with ' + userID + ' not found.',
      //     })
    );
  });
}
export default runScript;
