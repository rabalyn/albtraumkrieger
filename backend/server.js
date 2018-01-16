const config = require('./config')

const express = require('express')
const login = require('./routes/loginroutes')
const upload = require('./routes/fileroutes')
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

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' })
})

//route to handle user registration
router.post('/register',login.register)
router.post('/login',login.login)
//route to handle file printing and listing
router.post('/fileprint',multerupload.any(),upload.fileprint)
router.get('/members',upload.members)
router.get('/hall', upload.guildhall)
app.use('/api', router)
app.listen(config.app.port)