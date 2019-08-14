import { hashSync } from 'bcrypt';
import User from './user.model';

function UpdateUserObject(req, res, next) {
  const id = req.params.id || req.user._id;
  const userUpdate = JSON.parse(req.body.user);

  let updateOps = {};

  if (req.file) {
    userUpdate.avatar = req.file.filename || 'default.jpg';
  }

  if (userUpdate.password) {
    userUpdate.password = hashSync(userUpdate.password, 11);
  }

  User.findOne({ _id: id }, { _id: 0 })
    .then(() => {
      updateOps.updatedAt = Date.now();

      for (const key of Object.keys(userUpdate)) {
        if (userUpdate[key]) updateOps[key] = userUpdate[key];
      }
      res.locals.userUpdate = updateOps;
      next();
    })
    .catch(error => {
      console.log('error', error);
      next();
    });
}

export default UpdateUserObject;
