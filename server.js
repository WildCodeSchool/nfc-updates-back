require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');

const app = express();
const passport = require('passport');


const port = process.env.PORT;


app.use(cors());

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/users', users);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port${port}`);
});
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Authorization, access_token',
    'Access-Control-Expose-Headers': 'X-Requested-With,content-type, Authorization, access_token',
  });
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);
