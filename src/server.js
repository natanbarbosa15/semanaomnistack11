require("@google-cloud/trace-agent").start();
require("@google-cloud/debug-agent").start({ allowExpressions: true });

const app = require("./app");

app.listen(process.env.PORT);
