const express = require("express");
var bodyParser = require('body-parser')
var admin = require('firebase-admin');
var serviceAccount = require("./firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://domus-family.firebaseio.com"
});
var defaultMessaging = admin.messaging();

const app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post("/geolocation", jsonParser, (req, res, next) => {
  console.log(req.body);
  res.send('ok')
});

app.get("/sendpush", jsonParser, (req, res) => {
  const registrationToken = "cXQmxpJLLUnFvIsoGWPp3r:APA91bHyj1WRxwNK4jVVInitA00Q26HFw7vwDib_c0MLa9RpTUoTgzgzaMGUHFOsPb1dJB4UEoz5jd48y_bzUCaGOf2Qt23zZZHeo1OA3IY9T7bt_RVr6GaQgL6BQcXR7mbR72KuWc0c";

  admin.messaging().send({
    notification: { title: 'titulo', body: 'corpo' }, token: registrationToken
  })
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });

  res.send("OK");
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});