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
  const headers = { authorization };

  return request({
    url: url + "/" + fileId,
    headers,
    method: "GET"
  });
}

module.exports.uploadFile = (file, fileMetadata, url, authorization) => {
  let fileId;
  // Return a promise with the response from the upload
  return saveToKinvey(url, authorization, fileMetadata)
    .then(kinveyResponse => {
      const res = JSON.parse(kinveyResponse);
      fileId = res._id;

      return saveToGCS(res, file);
    })
    .then(() => getFileUrl(url, fileId, authorization));
};
