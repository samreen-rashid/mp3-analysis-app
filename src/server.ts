import { App } from '@/app';
import { ApiRoute } from '@/routes/api.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new ApiRoute()]);

app.listen();
