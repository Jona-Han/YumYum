import express from 'express';
import { PORT } from './src/config/config';
import { errorHandler } from './src/middleware/errorHandler';
import { notFoundHandler } from './src/middleware/notFoundHandler';
import cors from 'cors';
import postRouter from './src/controllers/postController';
import userRouter from './src/controllers/userController';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRouter);
app.use('/post', postRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
