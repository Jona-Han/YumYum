import express from 'express';
import { PORT } from './src/config/config';
import userRouter from './src/controllers/userController';
import { errorHandler } from './src/middleware/errorHandler';
import { notFoundHandler } from './src/middleware/notFoundHandler';
import cors from 'cors';
import postController from './src/controllers/postController';

const app = express();

app.use(cors());

app.use('/user', userRouter);
app.use('/post', postController);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
