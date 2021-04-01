var express = require('express')
var multer  = require('multer')
var path = require('path');
// var upload = multer({ dest: 'uploads/' })
const port = 3000
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,  file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

var app = express()
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})
app.post('/upload', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })
  const fs = require('fs')
  app.post('/upload1', upload.array('myFile',2), (req, res, next) => {
    const file =String(req.files[0].path)
    console.log(file)
    fs.readFile(file,function (err, data) {
      console.log(data)
    })
    res.send(file)
  })

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })