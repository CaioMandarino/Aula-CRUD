const express = require('express')
const path = require("path");
const db = require('./db')

const app = express()
const port = 3000

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(__dirname, 'public', 'index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
