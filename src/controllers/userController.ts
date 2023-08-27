import express from 'express';
import * as userService from '../services/userService';
import { validateAccessToken } from '../middleware/auth0';
import { getIDFromToken } from '../utils/getUserInfo';

const userRouter = express.Router();

userRouter.get('/', validateAccessToken, async (req: express.Request, res: express.Response) => {
  try {
    const userID = getIDFromToken(req);
    const user = await userService.getUserById(userID);
    res.status(200).json(user);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

userRouter.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const userID = getIDFromToken(req);
    const user = await userService.createUser(userID, req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

userRouter.put('/:id', validateAccessToken, async (req: express.Request, res: express.Response) => {
  try {
    const userID = getIDFromToken(req);
    const user = await userService.updateUser(userID, req.body);
    res.status(200).json(user);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

userRouter.delete('/', validateAccessToken, async (req: express.Request, res: express.Response) => {
  try {
    const userID = getIDFromToken(req);
    const user = await userService.deleteUser(userID);
    res.status(200).json(user);
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

export default userRouter;
