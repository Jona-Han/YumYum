import express from 'express';
import * as postLoginService from '../services/postLoginService';
import { validateAccessToken } from '../middleware/auth0';
import { getIDFromToken, getUserInfoFromToken } from '../utils/getUserInfo';
import { createUser } from '../services/userService';

const postLoginRouter = express.Router();

postLoginRouter.get(
  '/',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
        const userID: String = getIDFromToken(req);
        const isNewUser = await postLoginService.checkIfNewUser(userID);
        if (!isNewUser) {
            const userinfo = getUserInfoFromToken(req);
            res.status(300).send(userinfo);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
  }
);

export default postLoginRouter;
