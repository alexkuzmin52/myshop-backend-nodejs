export const config = {
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3333',
  PORT: process.env.PORT || 'http://localhost',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3333',

  serverRateLimits: {
    period: 10*60*1000,
    maxRequests: 1000
  },

  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/new_shop',

  JWT_CONFIRM_EMAIL_SECRET: process.env.JWT_CONFIRM_EMAIL_SECRET || 'tanmzyf',
  JWT_CONFIRM_EMAIL_LIFETIME: process.env.JWT_CONFIRM_EMAIL_LIFETIME || '10d',

  JWT_FORGOT_PASSWORD_EMAIL_SECRET: process.env.JWT_FORGOT_PASSWORD_EMAIL_SECRET || 'awersdfsytfg',
  JWT_FORGOT_PASSWORD_EMAIL_LIFETIME: process.env.JWT_FORGOT_PASSWORD_EMAIL_LIFETIME || '10d',

  JWT_AUTH_ACCESS_TOKEN_SECRET: process.env.JWT_AUTH_ACCESS_TOKEN_SECRET || 'qwertyuijhgf',
  JWT_AUTH_ACCESS_TOKEN_LIFETIME: process.env.JWT_AUTH_ACCESS_TOKEN_LIFETIME || '10d',

  JWT_AUTH_REFRESH_TOKEN_SECRET: process.env.JWT_AUTH_REFRESH_TOKEN_SECRET || 'mnbvcdfghj',
  JWT_AUTH_REFRESH_TOKEN_LIFETIME: process.env.JWT_AUTH_REFRESH_TOKEN_LIFETIME || '10d',

  ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
  ROOT_EMAIL: process.env.ROOT_EMAIL || 'Gmail',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'password',

  LIFE_TIME_USER_ORDER: process.env.LIFE_TIME_USER_ORDER || '* * * * *',
  LIFE_TIME_USER_CART: process.env.LIFE_TIME_USER_CART || '* * * * *'

};
