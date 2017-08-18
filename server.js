const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash-messages');
const expressValidator = require('express-validator');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost:27017/code_snippets', {
  useMongoClient: true
}).then(() => {
  console.log('database is connected.');
});

const app = express();
app.use(express.static('public'));

app.use(session({
  secret: 'bdodogjkskfsdlkfjdslkfjjs',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./passportconfig').configure(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(require('./routes/general'));
app.use(require('./routes/auth'));

app.listen(3000, function() {
  console.log('listening on port 3000')
});
