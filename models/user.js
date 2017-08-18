const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    require: true
  }
});

userSchema.virtual('password')
  .get(function() {return null;})
  .set(function(value) {
    const hash = bcrypt.hashSync(value, 10);
    this.passwordHash = hash;
  });

userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.statics.authenticate = function(username, password, done) {
  this.findOne({ username }, function(err, user) {
    if (err) {
      console.log('Error attempting to use static authenticate function', err);
      done(err);
    } else if (user && user.authenticate(password)) {
      console.log('This will succeed!');
      done(null, user);
    } else {
      console.log('Password was incorrect');
      done(null, false);
    }
  });
};


const User = mongoose.model('User', userSchema);

module.exports = User;
