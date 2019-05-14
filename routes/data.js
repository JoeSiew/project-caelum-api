let DataModel = require('../models/data_model')
let express = require('express')
let _ = require('lodash')
let auth = require('../middleware/auth')
let router = express.Router()

//Create a new data
// POST localhost:3000/data
router.post('/',auth,(req,res) => {

    if(!req.body) return res.status(400).send('Request body is missing')

    let model = new DataModel(_.pick(req.body,['Data','updatedOn']))

    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) return res.status(500).send(model)
            res.status(201).send(model)
            //res.status(201).send(model)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

// GET localhost:3000/data
router.get('/', (req, res) => {
   const timeNow = new Date()
   const year = String(timeNow.getFullYear())
   const month = String(timeNow.getMonth() + 1)
   const day = String(timeNow.getDate())
   const hr = String(timeNow.getHours())

   DataModel.findOne({
        updatedOn: `${year}-${month}-${day} ${hr}`
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router



