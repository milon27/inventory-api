const express = require('express')
const router = express.Router()
const os = require('os')
const path = require('path');

const UploadImage = require('../service/FileService')

const multer = require('multer');
const Response = require('../utils/Response');
const DataService = require('../service/DataService');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${os.tmpdir()}`)//
    },// new Date().toISOString() +
    filename: (req, file, callback) => {
        //callback(null, file.originalname)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const filetypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml']
const fileTypeCheck = (req, file, callback) => {
    if (filetypes.includes(file.mimetype))
        callback(null, true)//accept
    callback(null, false)//no upload that file
}

//upload config
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,//max 3 mb
    },
    fileFilter: fileTypeCheck
})

// const mc = (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     next()
// }

// router.use(mc)

router.post('/upload/:collection', upload.single('parts_img'), async (req, res) => {
    const data = req.body
    const img = req.file
    const fileName = img.filename
    const path = img.path
    const mimeType = img.mimetype
    //upload into firebase
    try {
        const imgurl = await UploadImage(fileName, mimeType)
        const collection = req.params.collection
        data.id = DataService.getId(collection)
        data.parts_img = imgurl

        res.json(await DataService.addDocument(collection, data))
    } catch (e) {
        res.json(new Response(true, e.message, { e }))
    }
})

//update 
router.put('/upload/:collection', upload.single('parts_img'), async (req, res) => {
    const data = req.body
    const img = req.file
    const fileName = img.filename
    const path = img.path
    const mimeType = img.mimetype
    //upload into firebase
    try {
        const imgurl = await UploadImage(fileName, mimeType)
        const collection = req.params.collection
        data.parts_img = imgurl

        res.json(await DataService.updateDocument(collection, data))
    } catch (e) {
        res.json(new Response(true, e.message, { e }))
    }
})
//update without image
router.patch('/upload/:collection', async (req, res) => {
    const data = req.body
    //console.log("data ", data);
    //upload into firebase
    try {
        const collection = req.params.collection
        res.json(await DataService.updateDocument(collection, data))
    } catch (e) {
        res.json(new Response(true, e.message, { e }))
    }
})


module.exports = router;