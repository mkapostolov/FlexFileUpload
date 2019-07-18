jest.setTimeout(30000);

module.exports = {
  kid: process.env.KINVEY_KID,
  appSecret: process.env.KINVEY_APPSECRET,
  service: process.env.KINVEY_SERVICE_ID,
  serviceEnv: process.env.KINVEY_SERVICE_ENV_ID
};
