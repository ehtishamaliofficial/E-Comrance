import mongoose from 'mongoose';
import crypto from 'crypto'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
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
        url: {
            type: String,
            required: true
        }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date

});

userSchema.method.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User',userSchema);

export default User;