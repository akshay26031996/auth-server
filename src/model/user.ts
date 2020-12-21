import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

const salt = 10;

interface IUser {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    password2: string,
    token: string
}

interface IUserDoc extends IUser, Document {
    comparePassword(this: IUserDoc, password: string, cb: (err: Error, isMatch: boolean) => void): void;
    generateToken(this: IUserDoc, cb: (err: Error, user: IUserDoc) => void): void;
    deleteToken(this: IUserDoc, cb: (err: Error, user: IUserDoc) => void): void;
    toJSON(this: IUserDoc): Object;
}

interface UserModelInterface extends Model<IUserDoc> {
    findByToken(token: string, cb: (err: Error, user: IUserDoc) => void): void;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 120
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 120
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    password2: {
        type: String,
        required: true,
        minlength: 8
    },
    token: {
        type: String
    }
});

UserSchema.pre<IUserDoc>('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        // TODO: Add check to match password and password2
        // Do we need to store hash in password2 as well?
        bcrypt.genSalt(salt, (err, salt) => {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                user.password2 = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});

UserSchema.methods.toJSON = function (this: IUserDoc): Object {
    let output = this.toObject();
    delete output.password;
    delete output.password2;
    delete output.token;
    return output;
}

UserSchema.methods.comparePassword = function (this: IUserDoc, password: string, cb: (err: Error, isMatch: boolean) => void) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err, false);
        cb(null, isMatch);
    });
}

UserSchema.methods.generateToken = function (this: IUserDoc, cb: (err: Error, user: IUserDoc) => void) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), config.JWT_SECRET);
    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err, null);
        cb(null, user);
    });
}

UserSchema.statics.findByToken = function (token: string, cb: (err: Error, user: IUserDoc) => void) {

    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
        User.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err, null);
            cb(null, user);
        });
    });
}

UserSchema.methods.deleteToken = function (this: IUserDoc, cb: (err: Error, user: IUserDoc) => void) {
    let user = this;

    user.update({ $unset: { token: 1 } }, function (err: Error, user: IUserDoc) {
        if (err) return cb(err, null);
        cb(null, user);
    });
}

const User: UserModelInterface = mongoose.model<IUserDoc, UserModelInterface>('User', UserSchema);

export { User, IUserDoc };