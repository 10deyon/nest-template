import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

import envProd from './env-production';
import envStaging from './env-staging';
import env from './env';

export default registerAs('config', () => {
  switch (process.env.APP_ENV) {
    case 'staging':
      return envStaging;
    case 'production':
      return envProd;
    default:
      return env;
  }
});
