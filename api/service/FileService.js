
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const os = require('os');
const admin = require('../utils/fbs/admin')

const Response = require("../utils/Response");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://bd-address-api-27.firebaseio.com",
//     storageBucket: "bd-address-api-27.appspot.com"
// });


var bucket = admin.storage().bucket();


const UploadImage = (filename, type, m_path = null) => {
    return new Promise((resolve, reject) => {
        //const fileName = "multer will give"
        let tempFilePath;
        if (m_path === null) {
            tempFilePath = path.join(os.tmpdir(), filename);
        } else {
            tempFilePath = m_path
        }

        const uid = uuidv4()

        bucket.upload(tempFilePath, {
            uploadType: "media",
            metadata: {
                contentType: type,
                metadata: {
                    firebaseStorageDownloadTokens: uid
                }
            }
        }).then((data) => {

            let file = data[0];

            const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${uid}`

            resolve(url)
        }).catch(e => {
            console.log("file url problem : ");
            reject(e.message)
        });
    })
}

module.exports = UploadImage;




/*
doc: https://firebase.google.com/docs/storage/admin/start?authuser=0
https://cloud.google.com/storage/docs/uploading-objects#storage-upload-object-code-sample
https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload


q. 94
https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase
*/