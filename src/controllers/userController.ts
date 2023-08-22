import express from 'express';
import * as userService from '../services/userService'; // Assuming userService exports multiple methods
import { validateAccessToken } from "../middleware/auth0";

const userRouter = express.Router();

userRouter.get('/',validateAccessToken , async (req: express.Request, res: express.Response) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

userRouter.get('/:id', validateAccessToken, async (req: express.Request, res: express.Response) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        res.status(200).json(user);
    } catch (error: any) {
        if (error.message === 'User not found') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

userRouter.post('/', validateAccessToken, async (req: express.Request, res: express.Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

userRouter.put('/:id', validateAccessToken, async (req: express.Request, res: express.Response) => {
    try {
        const user = await userService.updateUser(parseInt(req.params.id), req.body);
        res.status(200).json(user);
    } catch (error: any) {
        if (error.message === 'User not found') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

userRouter.delete('/:id', validateAccessToken, async (req: express.Request, res: express.Response) => {
    try {
        const user = await userService.deleteUser(parseInt(req.params.id));
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