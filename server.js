const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const User = require('./models/user')

const port = 5000
const url = 'mongodb://127.0.0.1:27017/douban'

mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.once('open', _ => {
    console.log('Database connected:', url)
})
mongoose.connection.once('error', err => {
    console.error('connection error:', err)
})

const formatJson = (data) => {
    return JSON.parse(JSON.stringify(data))
}

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, function () {
    console.log(`listening on port ${port}`)
})

app.all('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    next();
})

app.get('/', (req, res) => {
    User.find({}, {_id: 0, __v: 0}, (err, docs) => {
        if (!err) {
            let result = {
                code: 1,
                data: {
                    list: docs,
                    total: docs.length
                },
                msg: 'success'
            }
            res.json(formatJson(result))
        } else {
            res.json({code: 0, msg: "error"})
        }
    })
})

app.post('/quotes', (req, res) => {
    User.create(req.body, (err) => {
        if (!err) {
            console.log('创建成功', req.body)
            res.redirect('/')
        } else {
            console.log(err)
        }
    })
})