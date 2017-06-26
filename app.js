const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const session = require('express-session')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache',mustache());
app.set('view engine','mustache');
app.set('views','./views');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

function authenticate(req, username, password){
  var authenticatedUser = users.find(function(user){
    if (username === user.username && password === user.password){
      console.log("true");
      req.session.authenticated = true;
    }
    else {
      return false;
    }
  });
  return req.session;
}


app.get('/',function(req,res){
  res.render('./log-in')
})

app.post('/', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  console.log("username" + username + "password" + password);
  authenticate(req, username, password);
  if (req.session && req.session.authenticated){
    res.render('welcome', { username: username });
  } else {
    res.redirect('/log-in');
  }
})

let users= [
  {
    "username": "username",
    "password": "password"
  }
]


app.listen(3000, function() {
  console.log("listening");
})
