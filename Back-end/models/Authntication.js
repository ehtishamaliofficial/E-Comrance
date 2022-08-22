import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
      type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    avatar: {
        pablicId: {
            type: String,
            required: true                                                        
        },
        url:{
            type: String,
            required: true
        }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date

});

const User = mongoose.model('User', userSchema);

export default User;