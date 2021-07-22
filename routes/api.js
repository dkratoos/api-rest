
const express = require('express')
const lib = require('pipedrive')
const router = express.Router()
const Student = require('../models/student')


// router.get('/', async function(req,res,next){
//     var controller = lib.DealsController
//     var input = {}
//     input['status'] = 'won'

//     const user = await controller.getAllDeals(input, function(error, response, context) {
//         const deals = response.data.map(item => {
//             return {
//                 value: item.value,
//                 wonTime: item.won_time
//             }
//         })

//         Student.create(deals).then(function(student){
//             res.send(student)
//         }).catch(next)
//     })

//     res.send(user)
// })

module.exports = router