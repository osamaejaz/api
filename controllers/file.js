const express = require('express');
const router = express.Router();
const File = require('../models/file');
const formidable = require('formidable');

async function uploadFile(req, res) {
  const form = formidable.IncomingForm();
  form.multiples = true;

  form.parse(req, async function(err, fields, files) {
    let receivedFiles = [];
    if (files.file) {
      receivedFiles = [files.file];
    } else {
      receivedFiles = files.files;
    }

    const fileResults = [];
    for (const file of receivedFiles) {
      const createdFile = await File.create({
        name: file.name,
        author: req.params.userId
      });
      fileResults.push(createdFile);
    }
    res.send(fileResults);
  });
}
router.post('/:userId', uploadFile);
module.exports = router;
