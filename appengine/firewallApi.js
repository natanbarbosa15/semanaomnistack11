const { google } = require("googleapis");
const cloudfunctions = google.cloudfunctions("v1");
const AuthGoogle = require("./auth");

/**
 * Function to create App Engine Firewall block rule
 * @method function
 * @param {String} clientIp String for client IP to block
 */
async function firewallApiCall(clientIp) {
  // Config Google API Authentication
  const authClient = await AuthGoogle().catch(console.error);
  const request_data = {
    type: "appengine",
    ip: `${clientIp}`,
    action: "ban",
  };

  cloudfunctions.projects.locations.functions.call({
    name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/${process.env.GOOGLE_CLOUD_REGION}/functions/${process.env.DDOS_FUNCTION_ID}`,
    requestBody: {
      data: JSON.stringify(request_data),
    },
    auth: authClient,
  });
}

module.exports = firewallApiCall;
