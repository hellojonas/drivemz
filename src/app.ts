import express, { Application } from 'express';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import { globalErrorHandler, resourceNotFound } from './controllers/error';
import questionRouter from './routes/question';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(mongoSanitize());

app.use('/api/v1/questions', questionRouter);

app.use('*', resourceNotFound);

app.use(globalErrorHandler);

export default app;
