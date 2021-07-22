const express = require('express')
const mongoose = require('mongoose')

const app = express()

const lib = require('pipedrive')
const moment = require('moment')

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

const Deal = require('./models/deal')

app.get('/', async function(req,res,next){
    const controller = lib.DealsController
    const input = {
        status: 'won'
    }

    const user = await controller.getAllDeals(input, function(error, response, context) {
        const dealsPerDate = []

        const deals = response.data.map(item => {
            return {
                value: item.value,
                wonTime: moment(item.won_time).format('L')
            }
        })

        deals.filter(deal => {
            const hasDeal = dealsPerDate.findIndex(dealPerDate => dealPerDate.wonTime === deal.wonTime)

            if (hasDeal !== -1) {
                dealsPerDate[hasDeal].value += deal.value
            } else {
                dealsPerDate.push(deal)
            }
        })

        Deal.insertMany(dealsPerDate)
        res.send(dealsPerDate)
    })
})
