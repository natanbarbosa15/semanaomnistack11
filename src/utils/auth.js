const firebaseAdmin = require("../utils/firebaseAdmin");
const jwt_decode = require("jwt-decode");

module.exports.getCurrentUser = async (request) => {
  try {
    const encodedHeader = request.header("x-endpoint-api-userinfo");
    if (!encodedHeader) return null;
    const decodedHeader = jwt_decode(encodedHeader);
    var user = decodedHeader;
    if (process.env.NODE_ENV === "development") {
      user = await firebaseAdmin.auth().verifyIdToken(encodedHeader, true);
      user.id = user.uid;
    } else {
      user = decodedHeader;
    }
    return user;
  } catch (error) {
    console.error(error);
  }
};
