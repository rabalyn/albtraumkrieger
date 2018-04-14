process.env.DEBUG = 'updateStore:*'

import debug from 'debug'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
const MongoStore = connectMongo(session)
import models from './models'
const connection = models.Connection
const User = models.User
import passport from 'passport'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy
import helmet from 'helmet'

const logdebug = debug('server:debug')
logdebug('Executing server.js....')

const config = require('./config')

const express = require('express')
const guildhall = require('./routes/guildhallroutes')
const updateStore = require('./routes/updateStore')
const bodyParser = require('body-parser')

const app = express()
app.use(helmet())
app.use(helmet.noCache())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

let sessionOptions = {
    secret: 'fooafdafasfbrtg',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // for development
        maxAge: 60000 * 60 * 10,
        domain: config.cookie.domain,
        httpOnly: true,
        path: '/'
    },
    store: new MongoStore({ mongooseConnection: connection })
}

if(app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionOptions.cookie.secure = true // serve secure cookies
}

console.log(sessionOptions.cookie)
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
    next()
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000")
    //res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
const router = express.Router()

router.get('/members', guildhall.members)
router.get('/saveMembers', updateStore.loadMembersFromApi)
router.get('/hall', guildhall.guildhall)
router.get('/items', guildhall.items)
app.use('/api', router)

app.use((req, res, next) => {
    if(!req.session.user) {
        req.session.user = {}
    }

    next()
})

app.post('/api/login', passport.authenticate('local'), (req, res) => {
    console.log('POST /login    body: %s', JSON.stringify(req.body))
    console.log('POST /login sessionID: %s', req.session.id)
    req.session.user = {
        username: 'foo',
        isAdmin: true,
        authenticated: true,
        date: new Date().toString()
    }

    res.statusCode = 200
    const jsonResponse = {
        login: true,
        user: req.session.user.username,
        isAdmin: req.session.user.isAdmin
    }
    res.send(jsonResponse)
})

app.get('/api/foo', (req, res) => {
    req.session.reload(function(err) {
        if(err) {
            console.log('session reload error: ', err)
        }
        // session updated
        console.log('GET /foo    user: ', JSON.stringify(req.session.user))
        console.log('GET /foo sessionID: %s', req.session.id)
        res.send('/foo end')
    })
})

app.listen(config.app.port, config.app.host)
//app.listen(config.app.port, 'localhost')
