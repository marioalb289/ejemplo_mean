var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Usuarios = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: String,
});

Usuarios.pre('save',
    function(next) {
        if (this.password) {
            var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }

        next();
    }
);

Usuarios.methods.authenticate = function(password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');

    return this.password === md5;
};

 Usuarios.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne(
        {username: possibleUsername},
        function(err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                }
                else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            }
            else {
                callback(null);
            }
        }
    );
};

Usuarios.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuarios', Usuarios);

// var mongoose = require('mongoose'),
//     crypto = require('crypto'),
//     Schema = mongoose.Schema;

// var UserSchema = new Schema({
//     name: String,
//     email: String,
//     username: {
//         type: String,
//         trim: true,
//         unique: true
//     },
//     password: String,
//     provider: String,
//     providerId: String,
//     providerData: {},
//     todos: {}//we will use this in the next tutorial to store TODOs
// });

// UserSchema.pre('save',
//     function(next) {
//         if (this.password) {
//             var md5 = crypto.createHash('md5');
//             this.password = md5.update(this.password).digest('hex');
//         }

//         next();
//     }
// );

// UserSchema.methods.authenticate = function(password) {
//     var md5 = crypto.createHash('md5');
//     md5 = md5.update(password).digest('hex');

//     return this.password === md5;
// };

// UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
//     var _this = this;
//     var possibleUsername = username + (suffix || '');

//     _this.findOne(
//         {username: possibleUsername},
//         function(err, user) {
//             if (!err) {
//                 if (!user) {
//                     callback(possibleUsername);
//                 }
//                 else {
//                     return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
//                 }
//             }
//             else {
//                 callback(null);
//             }
//         }
//     );
// };

// mongoose.model('Usuarios', UserSchema);