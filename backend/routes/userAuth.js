const admins = require('../schemas/admins');

var JwtStrategy = require('passport-jwt').Strategy,
 ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function(passport)
{
    var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
    console.log("yessss", opts)
    passport.use('adminAuth',new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload, "payload")
    admins.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            console.log(user, "userrr")
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}))
};