
const express = require('express')
const router = express.Router()

const moment = require('moment')
const Deal = require('../models/deal')

const lib = require('pipedrive')
lib.Configuration.apiToken = '3d0c08562bf2aa874462b3ab6b472f64868eacbb'

// get a list of deals from the database
router.get('/deals',function(req,res,next){
    Deal.find({}).then(function(deals){
        res.send(deals);
    }).catch(next);
});

// get deals from pipedrive and register on mongodb
router.get('/', async function(req,res,next){
  const controller = lib.DealsController
  const input = {
      status: 'won'
  }

  await controller.getAllDeals(input, function(error, response, context) {
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
      res.send()
  })
})

module.exports = router