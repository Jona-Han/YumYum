import express from 'express';
import * as postLoginService from '../services/postLoginService';
import { validateAccessToken } from '../middleware/auth0';
import { getIDFromToken, getUserInfoFromToken } from '../utils/getUserInfo';
import { createUser } from '../services/userService';
import User from '../models/User';

const postLoginRouter = express.Router();

postLoginRouter.get(
  '/',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
        const userID: String = getIDFromToken(req);
        const isNewUser = await postLoginService.checkIfNewUser(userID);
        if (isNewUser) {
            const userinfo = await getUserInfoFromToken(req);
            const newUser: User = {
                givenName: userinfo.given_name,
                familyName: userinfo.family_name,
                email: userinfo.email
            }
            await createUser(userinfo.sub, newUser);
            res.status(201).send('New User created.');
        }
        res.status(200).send('User already exists.');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
  }
);

export default postLoginRouter;
