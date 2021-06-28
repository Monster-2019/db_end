const express = require('express')
const router = express.Router()

const { formatJson } = require('../utils/index')

const TopicModel = require('../models/topic')

router.get('/topic', (req, res) => {
  let { page, limit } = {
    page: 1,
    limit: 10,
    ...req.query
  }
  page = Number(page)
  limit = Number(limit)
  let skip = (page - 1) * limit
  TopicModel.find({}, { title: 1 })
    .then(res => {
      return res.length
    })
    .then(total => {
      TopicModel.find({}, { _id: 0 }, { limit: limit, skip: skip, sort: { time: -1 } }, (err, docs) => {
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
          console.log(err)
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

module.exports = router