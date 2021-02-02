var admin = require("firebase-admin");
var serviceAccount = require("../fbs/brick-factory-027-firebase-adminsdk.json");
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `${process.env.databaseURL}`,
    storageBucket: `${process.env.storageBucket}`
});

module.exports = admin
