import express, { Application } from 'express';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(mongoSanitize());

export default app;
