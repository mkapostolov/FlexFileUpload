const kid = process.env.KINVEY_KID;
const service = process.env.KINVEY_SERVICE_ID;
const serviceEnv = process.env.KINVEY_SERVICE_ENV_ID;
const request = require('request-promise-native');
const url = `https://console.kinvey.com/_api/v3/services/${service}/environments/${serviceEnv}/discover-source-metadata`;

test("should return -1 when the value is not present", () => {
  expect([1, 2, 3].indexOf(4)).toBe(-1);
});

test("sample request", async () => {
  const response = await request.post(url);
  console.log("response = ", response);
});
