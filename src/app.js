import express, { Router } from 'express';
import bodyParser from 'body-parser';
import api from './api';
import cors from 'cors';

const router = Router().use('/api', api);

export default express()
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(router);
