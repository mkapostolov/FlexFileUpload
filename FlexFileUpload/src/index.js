const sdk = require("kinvey-flex-sdk");
const handlers = require("./handlers/index");

sdk.service({ host: "0.0.0.0", port: process.env.PORT }, function(err, flex) {
  console.log(`===> Flex Service started (SDK v${flex.version})`);

  for (var funcName in handlers) {
    flex.functions.register(funcName, handlers[funcName]);
  }
});
