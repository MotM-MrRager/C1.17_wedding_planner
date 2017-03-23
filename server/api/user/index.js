'use strict';

import express from 'express';
import { index, user, updateUser, deleteUser, logout, isLoggedIn, searchResults } from './user.controller'
import passport from 'passport';
//let controller = require('./couple.controller');

let app = express();

let router = express.Router();

// all routes are relative to /api/couple

router.get('/', index);
router.get('/:id', isLoggedIn, user); // get http://localhost:3000/api/couple
router.get('/logout', isLoggedIn, logout);
router.post('/', (req, res, next) => {
  passport.authenticate('local-signup', (err, user) => {
      if (err) { return next(err) }
      if (!user) { return res.json('User not found') }
      res.json(user);
    })(req, res, next)
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', function(err, user) {
      if (err) { return next(err) }
      if (!user) { return res.json('User not found') }
      res.json(user);
    })(req, res, next)
});
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
      if (err) { return next(err) }
      if (!user) { return res.json('User not found') }
      res.json(user);
    })(req, res, next)
});
router.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/:id/results', isLoggedIn, searchResults);


export default router;
