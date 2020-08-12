require("dotenv").config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const cloudinary = require("cloudinary");

app.set('view engine', 'ejs');
app.use(ejsLayouts);
cloudinary.config(process.env.CLOUDINARY_URL);

app.get('/', function(req, res) {
  res.render('index');
});

app.post("/", upload.single("myFile"), function(req, res)
{
  cloudinary.uploader.upload(req.file.path, (result) =>
  {
    res.send(result);
  })
});

app.listen(3000);
