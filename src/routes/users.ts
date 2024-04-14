import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Info, User2, Payload } from '../types/customer';
import { register, getUser } from '../controllers/userController';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { jwtStrategy } from '../middlewares/passport';

const router = express.Router();

router.post('/register', register);
router.post('/login', async function loginUser(req: Request, res: Response, next?: NextFunction) {
  passport.authenticate('local', { session: false }, (err: Error, user: Express.User, info?: Info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info?.message,
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // Generate JWT token
            const payload = {
              id: user.id,
              email: user.email,
              name : user.name
            }
            const token = jwt.sign(payload, 'your-secret'); // Replace with your secret key
            
            return res.json({token});
        });
    })(req, res, next);
});

router.use(jwtStrategy)

router.get('/:id', getUser);


export default router;