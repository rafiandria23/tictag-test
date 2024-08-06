import _ from 'lodash';
import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  host: _.defaultTo(process.env.API_HOST, '127.0.0.1'),
  port: _.defaultTo(parseInt(process.env.API_PORT, 10), 3000),
}));
