const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public')); // 정적 폴더
app.use(express.json()); // json 데이터를 받을 수 있음

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://haroo:1234@cluster0.4xiqh.mongodb.net/node-auth';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);