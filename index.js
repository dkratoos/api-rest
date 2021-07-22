const express = require('express')
const mongoose = require('mongoose')

const app = express()

const lib = require('pipedrive')

lib.Configuration.apiToken = '3d0c08562bf2aa874462b3ab6b472f64868eacbb'

// connect to mongodb
mongoose.connect('mongodb://localhost/ourdata')
mongoose.Promise = global.Promise

app.use(express.static('public'))
app.use(express.json())

app.use('/api',require('./routes/api'))

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
})

app.listen(process.env.port || 4000, function(){
    console.log('Ready to Go!')
})
