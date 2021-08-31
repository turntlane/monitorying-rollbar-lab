const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '9e4d38628b9f4f3181cd9a3913cc3e62',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file saved')
})

const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log('up on 5000')
})