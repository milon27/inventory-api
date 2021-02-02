require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
//url encode + json encode + cors

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

//create router

//test
app.get('/', (req, res) => {
    res.send("its working...")
})

//crud operation, get-data,update-data,add-data
app.use('/api/auth', require('./api/router/authRouter'))


const port = process.env.PORT || 2828;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})