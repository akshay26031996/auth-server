import express, { NextFunction } from 'express';
import { User, IUserDoc } from '../model/user';

const router = express.Router();

export interface IUserAuthRequest extends express.Request {
    user: IUserDoc,
    token: string
}

// should be in a seperate service file
let auth = (req: IUserAuthRequest, res: express.Response, next: express.NextFunction) => {
    let token = req.cookies.auth;
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ error: true });
        }
        req.token = token;
        req.user = user;
        next();
    });
}


export { router as userRouter };

router.get('/user/profile', auth, (req: IUserAuthRequest, res) => {
    res.json({
        isAuth: true,
        user: req.user
    });
});
