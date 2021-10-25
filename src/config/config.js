// imports
const dotenv = require("dotenv");

// load .env into process.env
dotenv.config();

//  process.env is destructuring
const {
  MONGO_DB_URL,
  PORT,
  ENCRYPTION_SALT,
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL,
} = process.env;

const CONFIG = {
  app: {
    PORT: PORT || 4000,
  },
  db: {
    url: MONGO_DB_URL,
  },
  encrypt: {
    salt: ENCRYPTION_SALT,
  },
  firebase: {
    certConfig: {
      type: TYPE,
      project_id: PROJECT_ID,
      private_key_id: PRIVATE_KEY_ID,
      private_key: PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: CLIENT_EMAIL,
      client_id: CLIENT_ID,
      auth_uri: AUTH_URI,
      token_uri: TOKEN_URI,
      auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: CLIENT_X509_CERT_URL,
    },
  },
};

module.exports = {
  config: CONFIG,
};
