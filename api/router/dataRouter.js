const express = require('express')
const router = express.Router()
const {
    GetDataController,
    AddDataController,
    updateDataController,
    DeleteDataController,
    incrementDataController,
    GetSingleDataController,
    GetSubDataController
} = require('../controller/dataController');


router.get('/get-data/:collection', GetDataController)
router.get('/get-data/:collection/:sub_collection/:col_id', GetSubDataController)
router.get('/get-data/:collection/:id', GetSingleDataController)
router.post('/add-data/:collection', AddDataController)
router.put('/add-data/:collection', updateDataController)
router.delete('/delete/:collection/:id', DeleteDataController)
router.put('/up-data/:collection/:id/:field/:num', incrementDataController)
module.exports = router