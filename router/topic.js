const express = require('express')
const router = express.Router()

const { formatJson } = require('../utils/index')

const TopicModel = require('../models/topic')

router.get('/topic', (req, res) => {
  let { 
    page = 1,
    limit = 10,
    minAmount = 0,
    maxAmount = 99999,
    ...rest 
  } = req.query
  page = Number(page)
  limit = Number(limit)
  let skip = (page - 1) * limit

  if (rest.route) rest.route = rest.route.split(',')
  if (rest.subWay) rest.subWay = rest.subWay.split(',')
  if (rest.direction) rest.direction = rest.direction.split(',')
  if (minAmount !== 0 || maxAmount !== 99999) rest.amount = { $gte: Number(minAmount), $lte: Number(maxAmount) }

  TopicModel.find({ ...rest }, { _id: 1 })
    .then(res => {
      return res.length
    })
    .then(total => {
      TopicModel.find({ ...rest }, { _id: 0 }, { limit: limit, skip: skip, sort: { time: -1 } }, (err, docs) => {
        if (!err) {
          let result = {
            code: 1,
            data: {
              list: docs,
              page: page,
              limit: limit,
              total: total
            },
            msg: 'success'
          }
          res.json(formatJson(result))
        } else {
          res.json({ code: 0, msg: err })
        }
      })
    })
})

router.post('/topic', async (req, res) => {
  let { url } = req.body
  await TopicModel.findOne({ url }, async function (err, isTopic) {
    if (isTopic === null) {
      await TopicModel.create(req.body)
        .then(topic => {
          res.json({ code: 1, data: formatJson(topic) })
        })
        .catch(err => {
          res.json({ code: 0, msg: err })
        })
    } else {
      res.json({ code: 0, msg: "文章已存在" })
    }
  })
})

// router.put('/topicAll', async (req, res) => {
//   await TopicModel.find({}, async function (err, topic) {
//     console.log(topic.length)
//     topic.forEach(item => {
//       let amount = item.amount.map(num => Number(num)).filter(num => num !== 2021)
//       TopicModel.findOneAndUpdate({ url: item.url}, { amount }, function(err, topic) {
//         if (err) {
//           console.log(1)
//         }
//       })
//     })
//     res.json({ code: 1, data: formatJson(topic) })
//   })
// })

module.exports = router