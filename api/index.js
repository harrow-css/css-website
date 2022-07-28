const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.json({"hello":"wow"})
})

module.exports = {
   path: '/api',
   handler: app
}