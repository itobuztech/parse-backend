var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

console.log('No value for FOO yet:', process.env.FOO);

var api = new ParseServer({
  cloud: './cloud/main.js',
  databaseURI: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost/parse',
  appId: process.env.APP_ID ? process.env.APP_ID : 'parseapp',
  masterKey: process.env.APP_SECRET ? process.env.APP_SECRET : 'EE9UtETxqFZV2awN',
  serverURL: process.env.APP_URL ? process.env.APP_URL : '',
  javascriptKey: process.env.APP_JavascriptKey ? process.env.APP_JavascriptKey : 'eaDV3ZYDR9cMBG56',
  restAPIKey: process.env.APP_RestKey ? process.env.APP_RestKey: 'EE9UtETxqFZV2awN',

  verifyUserEmails: true,
  emailVerifyTokenValidityDuration: 2 * 60 * 60,
  preventLoginWithUnverifiedEmail: false,
  appName: 'Parse App',
  publicServerURL: 'http://localhost:8001/parse',
  serverURL: 'http://localhost:8001/parse',

  emailAdapter: {
    module: "parse-server-generic-email-adapter",
    options: {
      service: "Gmail",
      email: process.env.GMAILUSER,
      password: process.env.GMAILPASSWORD
    }
  },

});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

const port = process.env.PORT || 8001;
app.listen(port, function() {
  console.log(`parse-server-example running on port ${port}.`);
});
