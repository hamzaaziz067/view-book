import passport from 'passport';
import User from '../models/users.js';
import asyncHandler from 'express-async-handler';
import { getToken } from '../authenticate.js';

const userRegisterController = (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        if (req.body.fullname) user.full_name = req.body.fullname;
        if (req.body.email) user.email = req.body.email;
        if (req.body.gender) user.gender = req.body.gender;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
              success: true,
              status: 'Registration Successfull!',
              user: user,
            });
          });
        });
      }
    }
  );
};

const userLoginController = asyncHandler(async (req, res) => {
  await passport.authenticate('local', (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401);
      throw new Error('Login Unsuccessfull!');
    } else {
      req.logIn(user, (err) => {
        if (err) {
          res.status(401);
          throw new Error('Invalid username or password!');
        }
        const token = getToken({ _id: req.user._id });
        res.status(200);
        res.json({
          success: true,
          token: token,
          username: req.user.username,
        });
      });
    }
  })(req, res);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

const userProfileUpdate = (req, res) => {
  //check curent user is valid
  User.findOne({
    username: req.params.username,
  })
    .then(
      (user) => {
        const reqUser = req.user._id;
        const currUser = user._id;
        if (reqUser.equals(currUser)) {
          //update user
          User.findByIdAndUpdate(
            req.user._id,
            { $set: req.body },
            { new: true }
          )
            .then(
              (user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                  success: true,
                  status: 'Profile is Updated!',
                });
              },
              (err) => {
                return next(err);
              }
            )
            .catch((err) => {
              return next(err);
            });
        } else {
          const error = new Error(
            'You are not the valid user to perform this action!'
          );
          error.status = 403;
          return next(error);
        }
      },
      (err) => {
        return next(err);
      }
    )
    .catch((err) => {
      next(err);
    });
};

const updateUserCover = asyncHandler(async (req, res) => {
  const { cover } = req.body;
  const user = await User.findById(req.params.id);
  if (user) {
    user.cover = cover;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not Found!');
  }
});

export {
  updateUserCover,
  userRegisterController,
  userLoginController,
  getUserProfile,
  userProfileUpdate,
};
