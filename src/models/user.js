const { Schema, default: mongoose } = require("mongoose");


const userSchema = new Schema({
    name: String,
    email: {
        type:String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    about: String,
    profileUrl: String,
    address: {
        street: String,
        city: String,
        country: String,
        pincode: Number
    },
    // bufferCommands: false,
    // autoCreate: false // disable `autoCreate` since `bufferCommands` is false
})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User;