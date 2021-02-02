const express = require('express');
const router = express.Router()
const fileUpload = require('express-fileupload');
const UploadImage = require('../service/FileService');
const os = require('os')

const Response = require('../utils/Response');
//const DataService = require('../service/DataService');


// default options
//${os.tmpdir()}
const t = {
    useTempFiles: true,
    tempFileDir: `${os.tmpdir()}`
}
router.use(fileUpload(
    t
));



router.post('/img', async function (req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.json(new Response(true, "no file uploaded", { error: "no file" }))
        return
    }

    try {
        //console.log(req.files);
        const img = req.files.parts_img
        const data = req.body

        //const fileName = img.name
        //const mimeType = img.mimetype
        //const tmpPath = img.tempFilePath

        //const imgurl = await UploadImage(fileName, mimeType, tmpPath)

        res.json(new Response(false, "ok", { data, img }))
        //res.json(new Response(false, " file uploaded", { data: data, img: img, imgurl: imgurl }))
    } catch (e) {
        res.json(new Response(true, "soemthig went wrong", { error: e }))
    }



});

// router.post('/upload/:collection', upload.single('parts_img'), async (req, res) => {
//     const data = req.body
//     const img = req.file
//     const fileName = img.filename
//     const path = img.path
//     const mimeType = img.mimetype
//     //upload into firebase
//     try {
//         const imgurl = await UploadImage(fileName, mimeType)
//         const collection = req.params.collection
//         data.id = DataService.getId(collection)
//         data.parts_img = imgurl

//         res.json(await DataService.addDocument(collection, data))
//     } catch (e) {
//         res.json(new Response(true, e.message, { e }))
//     }
// })

// //update 
// router.put('/upload/:collection', upload.single('parts_img'), async (req, res) => {
//     const data = req.body
//     const img = req.file
//     const fileName = img.filename
//     const path = img.path
//     const mimeType = img.mimetype
//     //upload into firebase
//     try {
//         const imgurl = await UploadImage(fileName, mimeType)
//         const collection = req.params.collection
//         data.parts_img = imgurl

//         res.json(await DataService.updateDocument(collection, data))
//     } catch (e) {
//         res.json(new Response(true, e.message, { e }))
//     }
// })
// //update without image
// router.patch('/upload/:collection', async (req, res) => {
//     const data = req.body
//     //console.log("data ", data);
//     //upload into firebase
//     try {
//         const collection = req.params.collection
//         res.json(await DataService.updateDocument(collection, data))
//     } catch (e) {
//         res.json(new Response(true, e.message, { e }))
//     }
// })


module.exports = router;