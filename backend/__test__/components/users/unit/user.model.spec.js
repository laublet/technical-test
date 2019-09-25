import User from '@/components/users/user.model';
import { connect, disconnect } from '../../..//utils/mongoose';

let testUser;
let defaultUser;

const masterUser = {
  email: 'test@gmail.com',
  password: 'password1',
  username: 'Test user',
};

describe('Model: User', () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    defaultUser = {
      ...masterUser,
    };
    await User.remove();
    testUser = await User.create(masterUser);
  });

  describe.only('#save()', () => {
    it('should required email, password, username ', () => {
      const user = new User();
      const { errors } = user.validateSync();
      expect(errors.email.message).toEqual('Email is required');
      expect(errors.password.message).toEqual('Password is required');
      expect(errors.username.message).toEqual('Name is required');
    });

    it('should required a valid email', () => {
      defaultUser.email = 'notgoodemail';
      const user = new User(defaultUser);
      let validation = user.validateSync();
      expect(validation.errors.email.message).toEqual(`${defaultUser.email} is not a valid email`);
      user.email = 'test@gmail.com';
      validation = user.validateSync();
      expect(validation).toEqual(undefined);
    });

    it('should required a strong password', () => {
      defaultUser.password = 'not';
      const user = new User(defaultUser);
      let validation = user.validateSync();
      expect(validation.errors.password.message).toEqual('Password need to be longer');

      user.password = 'password';
      validation = user.validateSync();
      expect(validation.errors).toHaveProperty('password');

      user.password = 'password1';
      validation = user.validateSync();
      expect(validation).toEqual(undefined);
    });
  });

  describe('#authenticateUser()', () => {
    it('should be authenticated if good password', async () => {
      expect(testUser.authenticateUser(masterUser.password)).toEqual(true);
    });

    it('should return an error if no good password', () => {
      expect(testUser.authenticateUser('notgoodpassword')).toEqual(false);
    });
  });

  describe('#toJSON()', () => {
    it('should return _id, email, role', () => {
      const jsonUser = testUser.toJSON();
      expect(jsonUser).toHaveProperty('_id');
      expect(jsonUser).toHaveProperty('email');
      expect(jsonUser).toHaveProperty('role');
    });

    it('should not return password', () => {
      const jsonUser = testUser.toJSON();
      expect(jsonUser).not.toHaveProperty('password');
    });
  });

  describe('#toAuthJSON()', () => {
    it('should return _id, token', () => {
      const jsonUser = testUser.toAuthJSON();
      expect(jsonUser).toHaveProperty('_id');
      expect(jsonUser).toHaveProperty('token');
    });

    it('should not return password', () => {
      const jsonUser = testUser.toAuthJSON();
      expect(jsonUser).not.toHaveProperty('password');
    });
  });

  afterAll(async () => {
    await disconnect();
  });
});
