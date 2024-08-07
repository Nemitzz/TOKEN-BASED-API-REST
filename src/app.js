import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();
import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import delay from 'express-delay';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import itemRoutes from './routes/itemRoutes';
import photoRoutes from './routes/photoRoutes';

const whiteList = ['http://localhost:3001'];

const corsOption = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    //this.app.use(helmet());
    this.app.use(delay(200));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      '/images/',
      express.static(resolve(__dirname, '..', 'uploads', 'images')),
    );
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/items/', itemRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
