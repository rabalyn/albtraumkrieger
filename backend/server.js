const config = require('./config')

const express = require('express')
const guildhall = require('./routes/guildhallroutes')
const bodyParser = require('body-parser')
/*
Module:multer
multer is middleware used to handle multipart form data
*/
const multer = require('multer')
const multerupload = multer({ dest: 'fileprint/' })
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
const router = express.Router()

router.get('/members',guildhall.members)
router.get('/hall', guildhall.guildhall)
router.get('/items', guildhall.items)
app.use('/', router)
app.listen(config.app.port)