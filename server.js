const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const TopicRouter = require('./router/topic')

const port = 5000
const url = 'mongodb://dbAdmin:dd123456@121.199.51.37:27017/douban'

mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.once('open', _ => {
    console.log('Database connected:', url)
})
mongoose.connection.once('error', err => {
    console.error('connection error:', err)
})

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

app.use('/api', TopicRouter)

// app.post('/quotes', (req, res) => {
//     TopicModel.create(req.body, (err) => {
//         if (!err) {
//             console.log('创建成功', req.body)
//             res.redirect('/')
//         } else {
//             console.log(err)
//         }
//     })
// })