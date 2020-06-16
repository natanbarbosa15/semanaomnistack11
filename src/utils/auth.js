const firebaseAdmin = require("../utils/firebaseAdmin");

module.exports.getCurrentUser = async (request) => {
  try {
    const encodedHeader = request.header("x-endpoint-api-userinfo");
    if (!encodedHeader) return null;
    var user = undefined;
    if (process.env.NODE_ENV === "development") {
      user = await firebaseAdmin.auth().verifyIdToken(encodedHeader, true);
      user.id = user.uid;
    } else {
      const decodedHeader = JSON.parse(Buffer.from(encodedHeader, "base64"));
      user = decodedHeader;
      if (process.env.NODE_ENV === "production") user.id = user.user_id;
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};
