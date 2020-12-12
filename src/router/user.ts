import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();
const BCRYPT_SALT_ROUNDS = 12;

router.post('/user/register', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function (hashedPassword) {
            res.send({ username, hashedPassword });
        })
        .then(function () {
            res.send();
        })
        .catch(function (error) {
            console.log("Error saving user: ");
            console.log(error);
            next();
        });
});

router.post('/login', (req, res, next) => {

});

export { router as userRouter }