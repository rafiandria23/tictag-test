import _ from 'lodash';
import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  uri: _.defaultTo(process.env.DB_URI, 'mongodb://127.0.0.1:27017'),
  user: _.defaultTo(process.env.DB_USER, 'tictag'),
  pass: _.defaultTo(process.env.DB_PASS, 'tictag'),
  name: _.defaultTo(process.env.DB_NAME, 'tictag'),
}));
