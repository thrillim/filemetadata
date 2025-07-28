var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
// use memoryStorage so no disk I/O on Vercel
// memoryStorage:
// isn’t localStorage (the browser API) at all
// it’s a Multer “storage engine” that keeps uploaded files in RAM as a Buffer
// It lives on the server side inside the multer package
const storage = multer.memoryStorage();
const upload  = multer({ storage });
var app = express();

app.use(cors());
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/fileanalyse',
  upload.single('upfile'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }
    const fileInfo = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    };
    res.json(fileInfo);
  }
)


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
