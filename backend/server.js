process.env.DEBUG = 'updateStore:*'

import debug from 'debug'
const logdebug = debug('server:debug')
logdebug('Executing server.js....')

const config = require('./config')

const express = require('express')
const guildhall = require('./routes/guildhallroutes')
const updateStore = require('./routes/updateStore')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
const router = express.Router()

router.get('/members', guildhall.members)
router.get('/saveMembers', updateStore.loadMembersFromApi)
router.get('/hall', guildhall.guildhall)
router.get('/items', guildhall.items)
app.use('/', router)

app.listen(config.app.port, config.app.host)
//app.listen(config.app.port, 'localhost')
