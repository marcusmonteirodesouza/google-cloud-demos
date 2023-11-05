import {Joi} from 'celebrate';
import {NodeEnv} from '../common/enums';

const envVarsSchema = Joi.object()
  .keys({
    GOOGLE_MAPS_API_KEY: Joi.string().required(),
    LOG_LEVEL: Joi.string().valid('debug', 'info').required(),
    NODE_ENV: Joi.string()
      .valid(NodeEnv.Development, NodeEnv.Test, NodeEnv.Production)
      .required(),
    PGHOST: Joi.string().required(),
    PGPORT: Joi.number().integer().required(),
    PGUSERNAME: Joi.string().required(),
    PGPASSWORD: Joi.string().required(),
    PGDATABASE: Joi.string().required(),
    PGPOOL_MIN_CONNECTIONS: Joi.number().integer().required(),
    PGPOOL_MAX_CONNECTIONS: Joi.number().integer().required(),
    PORT: Joi.number().integer().required(),
  })
  .unknown();

const {value: envVars, error} = envVarsSchema.validate(process.env);

if (error) {
  throw error;
}

const config = {
  googleMapsServices: {
    apiKey: envVars.GOOGLE_MAPS_API_KEY,
  },
  logLevel: envVars.LOG_LEVEL,
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  pg: {
    host: envVars.PGHOST,
    port: envVars.PGPORT,
    username: envVars.PGUSERNAME,
    password: envVars.PGPASSWORD,
    name: envVars.PGDATABASE,
    pool: {
      connections: {
        min: envVars.PGPOOL_MIN_CONNECTIONS,
        max: envVars.PGPOOL_MAX_CONNECTIONS,
      },
    },
  },
};

export {config};
