const { uploadFile } = require("../helpers/uploadFile");

module.exports.uploadFromBase64 = (context, complete, modules) => {
  const instanceId = "kvy-us1";

  const host = `https://${instanceId}-baas.kinvey.com`;
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
        .setBody(err.message)
        .runtimeError()
        .done()
    );
};
