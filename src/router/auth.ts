import express from 'express';
import { User } from '../model/user';

const router = express.Router();

router.post('/user/register', (req, res) => {
    const user = new User(req.body);

    if (user.password !== user.password2) {
        return res.status(400).json({ message: "Password not match" });
    }
    user.save((err, user) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ success: false });
        }
        res.status(200).json({
            success: true,
            user: user
        });
    });
});


router.post('/user/login', (req, res) => {
    let token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        // TODO: Check for correct error code
        if (err) return res.status(400).send(err);
        if (user) return res.status(400).json({ error: true, message: "User already logged in" });
        else {
            User.findOne({ 'email': req.body.email }, (err, user) => {
                if (!user) return res.json({ isAuth: false, message: 'Authorization failed' });
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) return res.json({ isAuth: false, message: 'Authorization failed' });
                    if (!isMatch) return res.json({ isAuth: false, message: 'Authorization failed' });
                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie('auth', user.token).json({
                            isAuth: true,
                            id: user._id,
                            email: user.email
                        });
                    });
                });
            });
        }
    });
});

export { router as authRouter };