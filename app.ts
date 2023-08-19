const express = require('express')
const config = require('./src/config/config')

const app = express()

app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
})