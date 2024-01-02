const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var { getAll, getOne, getSome, insertData, putData, deleteData, uploadFile} = require('../controllers/users');
const router = express.Router();
//where to store the file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(path.join(__dirname, '/public'))) {
       fs.mkdirSync(path.join(__dirname, '/public'));
      }
      if (!fs.existsSync(path.join(__dirname, '/public/videos'))) {
        fs.mkdirSync(path.join(__dirname, '/public/videos'));
      }
      cb(null, path.join(__dirname, '/public/videos'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mkv" && ext !== ".mp4" && ext !== ".png" && ext !== ".jpg") {
      return cb(new Error("Only videos are allowed!"));
    }
    cb(null, true);
  },
});
router.get('/getall/:collName', getAll);
router.get('/getone/:collName/:id', getOne);
router.get('/getsome/:collName', getSome);
router.put('/updatedata/:collName/:id', putData);
router.put('/insertdata/:collName', insertData);
router.delete('/deletedata/:collName/:id', deleteData);
router.post('/uploadfile', upload.fields([
  {
    name: "videos",
    maxCount: 5,
  },
]), uploadFile);
module.exports.midl = router;