const sdk = require("kinvey-flex-sdk");
const { uploadFile } = require("./handlers/uploadFile");

sdk.service({}, function(err, flex) {
  console.log(`===> Flex Service started (SDK v${flex.version})`);

  flex.functions.register("uploadFile", function(context, complete, modules) {
    const host = "https://baas.kinvey.com";
    const appKey = modules.backendContext.getAppKey();
    const url = host + "/blob/" + appKey;
    const { authorization } = context.headers;
    const { metadata, file } = context.body;
    const binaryFile = Buffer.from(file, "base64");

    uploadFile(binaryFile, metadata, url, authorization)
      .then(response =>
        complete()
          .setBody(response)
          .done()
      )
      .catch(err =>
        complete()
          .setBody(err)
          .runtimeError()
          .done()
      );
  });
});
