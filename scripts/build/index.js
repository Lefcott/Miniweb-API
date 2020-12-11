import { updateEnv } from './update_env';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'localhost') process.exit();

updateEnv();
