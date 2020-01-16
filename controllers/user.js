const User = require('../models/user');
const express = require('express');
const router = express.Router();

async function createUser(req, res) {
  if (req.body) {
    try {
      await User.create(req.body);
    } catch (err) {
      res.send(err);
    }
    res.send(req.body);
  }
}
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
}

async function updateUserDetails(req, res) {
  if (req.params.id) {
    const userDetails = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      },
      err => {
        if (err) {
          res.send(err);
        }
      }
    );
    res.send(userDetails);
  }
}

//routes

router.post('/create-user', createUser);

router.get('', getAllUsers);

router.put('/update-user/:id', updateUserDetails);

module.exports = router;
