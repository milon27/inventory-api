const DataService = require("../service/DataService")

const GetDataController = async (req, res) => {
    const collection = req.params.collection
    res.json(await DataService.getDocuments(collection))
}

const GetSubDataController = async (req, res) => {
    const collection = req.params.collection
    const sub_collection = req.params.sub_collection
    const col_id = req.params.col_id
    res.json(await DataService.getSubCollDocuments(collection, sub_collection, col_id))
}

const GetSingleDataController = async (req, res) => {
    const collection = req.params.collection
    const id = req.params.id
    res.json(await DataService.getDocument(collection, id))
}

const AddDataController = async (req, res) => {
    const data = req.body
    const collection = req.params.collection
    data.id = DataService.getId(collection)
    res.json(await DataService.addDocument(collection, data))
}

const updateDataController = async (req, res) => {
    const data = req.body
    const collection = req.params.collection
    res.json(await DataService.updateDocument(collection, data))
}

const DeleteDataController = async (req, res) => {
    const collection = req.params.collection
    const id = req.params.id
    res.json(await DataService.deleteDocument(collection, id))
}

const incrementDataController = async (req, res) => {

    const collection = req.params.collection
    const id = req.params.id
    const field = req.params.field
    const num = req.params.num

    res.json(await DataService.incrementFiledValue(collection, id, field, num))
}

module.exports = {
    GetDataController,
    GetSubDataController,
    GetSingleDataController,
    AddDataController,
    updateDataController,
    DeleteDataController,
    incrementDataController
}