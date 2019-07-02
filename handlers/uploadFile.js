const request = require("request-promise-native");

function saveToKinvey(url, authorization, fileMetadata) {
  const headers = {
    authorization,
    "Content-Type": "application/json",
    "X-Kinvey-Content-Type": fileMetadata.mimeType
  };

  return request({
    url,
    headers,
    method: "POST",
    body: JSON.stringify(fileMetadata)
  });
}

function saveToGCS({ _uploadURL, mimeType, size, _requiredHeaders }, fileBuffer) {
  _requiredHeaders["Content-Lenght"] = size;
  _requiredHeaders["Content-Type"] = mimeType;

  return request({
    url: _uploadURL,
    method: "PUT",
    headers: _requiredHeaders,
    body: fileBuffer
  });
}

function getFileUrl(url, fileId, authorization) {

  return request({
    url: url + "/" + fileId,
    method: "GET",
    headers: { authorization }
  });
}

module.exports.uploadFile = async (file, fileMetadata, url, authorization) => {
  const metadata = await saveToKinvey(url, authorization, fileMetadata);
  const meta = JSON.parse(metadata);
  const fileId = meta._id;
  await saveToGCS(meta, file);

  return getFileUrl(url, fileId, authorization);
};
