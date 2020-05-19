const { google } = require("googleapis");

/**
 * Function to create a Google Authentication Client
 * @method function
 */
async function AuthGoogle() {
  // This method looks for the GOOGLE_APPLICATION_CREDENTIALS environment variable.
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const authClient = await auth.getClient();

  return authClient;
}

module.exports = AuthGoogle;
