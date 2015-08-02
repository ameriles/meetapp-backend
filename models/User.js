var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    facebookId: String,
    googlePlusId: String,
    email: String,
    // can be empty. Used as a meetapp user id if no other identity provider is provided
    password: String,
    // can be empty
    gender: String,
    birthday: String,
    nickname: String,
    imageUri: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users'
});
module.exports = mongoose.model('User', UserSchema);