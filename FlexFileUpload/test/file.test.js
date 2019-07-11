const request = require('request-promise-native');

test("should return -1 when the value is not present", () => {
  expect([1, 2, 3].indexOf(4)).toBe(-1);
});

test("sample request", async () => {
  const response = await request.post("http://localhost:10001/_command/discover");
  console.log("response = ", response);
});
