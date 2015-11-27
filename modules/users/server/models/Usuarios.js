var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Usuarios = new Schema({
    username: String,
    password: String
});

Usuarios.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usuarios', Usuarios);