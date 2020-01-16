const User = require('../models/user');
const express = require('express');
const router = express.Router();
const File = require('../models/file');

async function createUser(req, res) {
  if (req.body) {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (err) {
      res.send(err);
    }
  }
}
async function getUserDetails(req, res) {
  try {
    const user = await User.findById(req.params.id);
    // .populate('file')
    // .exec((err, f) => {
    //   console.log('file', f);
    // });
    if (user.profileImages.length) {
      const files = await getAllFiles(user.profileImages);
      user.files = files;
      res.send(user);
    } else {
      res.send(user);
    }
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

async function deleteUserById(req, res) {
  await User.findByIdAndRemove(req.params.id);
  res.send({
    sucess: true,
    msg: 'User Deleted'
  });
}

async function getAllFiles(fileIds) {
  const fileDetails = [];
  fileIds.forEach(async function(id) {
    const file = await File.findById(id);
    fileDetails.push(file);
  });
  return fileDetails;
}

//routes

router.post('/create-user', createUser);

router.get('/:id', getUserDetails);

router.put('/update-user/:id', updateUserDetails);

router.get('/delete-user/:id', deleteUserById);

module.exports = router;
