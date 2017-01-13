var passport = require('passport');
var WindowsStrategy = require('passport-windowsauth');

var userPassport = function (app) {
    app.use(passport.initialize());


    //    passport.use(new WindowsStrategy({
    //        ldap: {
    //            url: 'ldap://igdsadam.US.NA.EYDev.NET:636',
    //            base: 'O=EYG,CN=IGDSADAM,DC=US,DC=NA,DC=EYDev,DC=NET',
    //            bindDN: 'NAD',
    //            username: 'G.ATF.V1',
    //            password: 'AuditApplication$$Mode01'
    //        }
    //    }, function (profile, done) {
    //        User.findOrCreate({
    //            waId: profile.id
    //        }, function (err, user) {
    //            done(err, user);
    //        });
    //    }));

        passport.use(new WindowsStrategy({
            integrated: true
        }, function (profile, done) {
            var user = {
                id: profile.id,
            };
            done(null, user);
        }));

    app.use(passport.session());

    passport.serializeUser(function (user, callback) {
        console.log(user);
        callback(null, user);
    });

    passport.deserializeUser(function (userId, callback) {
        console.log(user);
        callback(null, user);
    });

    app.get('/express-passport',
        passport.authenticate('WindowsAuthentication'),
        function (req, res) {
            res.json(req.user);
        });
};

module.exports = userPassport;