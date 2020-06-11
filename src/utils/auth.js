module.exports.getCurrentUser = (request) => {
  const encodedHeader = request.header("x-endpoint-api-userinfo");
  if (!encodedHeader) return null;
  const decodedHeader = JSON.parse(Buffer.from(encodedHeader, "base64"));
  return decodedHeader;
};
