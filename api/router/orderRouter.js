const express = require('express')
const DataService = require('../service/DataService')
const Define = require('../utils/Define')
const Response = require('../utils/Response')
const router = express.Router()


router.post('/new', async (req, res) => {

    try {
        const data = req.body
        //console.log("req= ", data);
        const id = DataService.getId(Define.order_collection)

        let p_list = []
        if (process.env.NODE_ENV === "development") {
            p_list = JSON.parse(data.product_list)
        } else {
            p_list = data.product_list
        }

        const obj = {
            id: id,
            so_num: data.so_num,//sales_order_number
            admin_id: data.admin_id,
            customer_name: data.customer_name,
            order_date: data.order_date,
            order_desc: data.order_desc + ""
        }
        // console.log("order : ", obj);
        //res.json(obj)
        res.json(await DataService.batchWriteDec(obj, p_list))//product_list
    } catch (e) {
        res.json(new Response(true, `Add Order Faild,${e.message}`, e))
    }
})


module.exports = router