const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const dataRoute = require('./routes/data')
const users = require('./routes/users')
const mongoose = require('mongoose')
const config = require('config')

//Production
const helmet = require('helmet')
const compression = require('compression')
//Database
const db = config.get('db');
mongoose.connect(db, { useNewUrlParser :true } )
.then(() => console.log(`Connected to MongoDB at ${db}...`))
.catch(err => console.error(`Could not connect to MongoDB at ${db}...`))

app.use(bodyParser.json())
app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})
app.use('/data',dataRoute)
app.use('/user',users)
app.use(express.static('public'))
app.use(helmet())
app.use(compression())

// Handle for 404 - Resource not found
app.use((req,res,next) =>{
    res.status(404).send('Resource not found')
})

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, './public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT,() => console.info(`Server has started on ${PORT}`))

