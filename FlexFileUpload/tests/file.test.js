const request = require("request-promise-native");
const { kid, appSecret } = require("./setup");

const userUrl = `https://${kid}:${appSecret}@baas.kinvey.com/user/${kid}/`;
const customEndpointUrl = `https://baas.kinvey.com/rpc/${kid}/custom/`;
const fileData = require("./test-file.json");
let accessToken;

beforeAll(async () => {
  let response = await request({
    url: userUrl,
    method: "POST",
    body: JSON.stringify({ username: "123", password: "123" })
  });
  console.log("response = ", response);
  response = JSON.parse(response);
  accessToken = response._kmd.authtoken;
  console.log("accessToken = ", accessToken);
});

test("should return -1 when the value is not present", () => {
  expect([1, 2, 3].indexOf(4)).toBe(-1);
});

test("sample request", async () => {
  const response = await request({
    url: customEndpointUrl + "uploadFromBase64",
    method: "POST",
    headers: { Authorization: `Kinvey ${accessToken}` },
    body: JSON.stringify(fileData)
  });
  console.log("response = ", response);
});
