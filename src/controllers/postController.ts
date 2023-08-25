import express from 'express';
import * as postService from '../services/postService';
import { validateAccessToken } from '../middleware/auth0';
import { getIDFromToken } from '../utils/getIDFromToken';

const postRouter = express.Router();

postRouter.get(
  '/random/:count',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const posts = await postService.getXRandomPosts(Number(req.params.count));
      res.json(posts);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

postRouter.get(
  '/user',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const userId = getIDFromToken(req);
      const posts = await postService.getUserPosts(userId);
      res.json(posts);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

postRouter.get(
  '/:postID',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const post = await postService.getSpecificPost(Number(req.params.postID));
      res.json(post);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

postRouter.post('/', validateAccessToken, async (req: express.Request, res: express.Response) => {
  try {
    const userId: String = getIDFromToken(req);
    await postService.createPost(userId, req.body);
    res.status(201).send('Post created');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

postRouter.delete(
  '/:postID',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
      await postService.deletePost(Number(req.params.postID));
      res.send('Post deleted');
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

export default postRouter;
