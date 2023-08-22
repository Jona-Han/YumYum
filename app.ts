import express from 'express';
import { PORT } from './src/config/config';
import userRouter from './src/controllers/userController';
import { errorHandler } from './src/middleware/errorHandler';
import { notFoundHandler } from './src/middleware/notFoundHandler';

const app = express();

app.use('/users', userRouter);

app.use(errorHandler);
app.use(notFoundHandler);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
