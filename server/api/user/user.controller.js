import userModel from './user.model';
import plannerModel from '../wedding_planner/wedding_planner.model';

export function index(req, res) {
  console.log(userModel.find().exec((err, user) => {
    if (err) {
      console.log("Error:", err);
      res.status(404).send('\nfailed to get couples\n\n');
    } else {
      res.status(200).json(user);
    }
  }));
}

export function user(req, res) {
  userModel.findById({
    '_id': req.user._id
  }).select('-password').exec((err, user) => {
    if (err) {
      res.status(404).json(err);
    } else {
      let fullPlanners = [];
      if(user.planners.length > 0) {
        if(user.planners.length = 1) {
          plannerModel.findById({
            '_id': user.planners
          }).select('-password').exec((err, planner) => {
            fullPlanners.push(planner);
            console.log(fullPlanners);
          })
        } else {
          for(let i in user.planners) {
            plannerModel.findById({
              '_id': user.planners[i]
            }).select('-password').exec((err, planner) => {
              console.log("planner inside for in loop", planner);
              fullPlanners.push(planner);
            })
          }
        }
      }
      console.log(fullPlanners);
      user.planners = fullPlanners;
      res.status(200).json(user);
    }
  });
}

export function updateUser(req, res) {
  userModel.findOneAndUpdate({
      '_id': req.user._id
    }, req.body, {
      new: true
    })
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(404).json(err);
    });
}

export function deleteUser(req, res) { // TODO
    userModel.findOneAndUpdate({
      '_id': req.user._id
    }, { $set: { 'status': 'deleted' }}, {
      new: true
    })
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(404).json(err);
    });
}

export function addPlanner(req, res) {
    userModel.findOneAndUpdate({
      '_id': req.user._id
    }, { $push: { 'planners': req.body.planner }}, {
      new: true
    })
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(404).json(err);
    });
}

export function logout(req, res) {
  console.log('logout called');
  req.logOut();
  req.session.destroy((err) => {
    if(err){
      console.log(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}

export function isLoggedIn(req, res, next) {
  return next();
  // console.log(req);
  // if(req.isAuthenticated()) {
  //   console.log('is authenticated');
  //   return next();
  // }
  // res.redirect('/');
}

export function loggedIn(req, res, next) {
  if(req.user) {
    res.json(req.user);
  }
}
