const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

function configure(passport) {

  const strategyFunc = function(username, password, done) {
    User.authenticate(username, password, function(err, user) {
      if (err) {
        console.log('LocalStrategy - error trying to authenticate');
        done(err);
      }
      else if (user) {
        console.log('LocalStrategy - Successful login!');
        done(null, user);
      }
      else {
        console.log('LocalStrategy - could not find the user');
        done(null, false , {
          message: 'Either the username or password were invalid.'
        });
      }
    });
  }
  passport.use(new LocalStrategy(strategyFunc));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
}

module.exports = {
  configure
}
