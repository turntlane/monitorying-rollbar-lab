const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '9e4d38628b9f4f3181cd9a3913cc3e62',
    captureUncaught: true,
    captureUnhandledRejections: true
})
const foods = []
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file saved')
})
//for javascript file

// app.get('/index', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.js'))
//     rollbar.info('html file saved')
// })


app.post('/api/food', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = foods.findIndex(foodName => foodName === name)

    if(name !== '' ) {
        foods.push(name)
        rollbar.log('Food added')
        res.status(200).send(foods)
    }else if (name === 'pizza') {
        rollbar.log('this mf likes pizza nice')
        res.status(200).send('congrats')
    }
    else if (name === '') {
        rollbar.critical('No food given')
        res.status(400).send('must send food name')
    }
    else {
        rollbar.error('food already exists')
        res.status(400).send('food already exists')
    }

})




const port = process.env.PORT || 5000

app.use(rollbar.errorHandler())


app.listen(port, () => {
    console.log('up on 5000')
})