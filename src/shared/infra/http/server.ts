import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errors as getCelebrateErrorHandler } from 'celebrate';
import 'express-async-errors';

import '@shared/container';

import errorHandler from '@shared/infra/http/middlewares/errorHandler';
import routes from '@shared/infra/http/routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(getCelebrateErrorHandler());
app.use(errorHandler);

app.listen(3333, () => console.log('Server listening on port 3333'));
