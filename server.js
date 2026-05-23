const express = require('express')
const path = require("path");
const db = require('./db')

const app = express()
const port = 3000

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

const apiRoutes = require('./routes/api')
app.use(express.json())
app.use('/api/users', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
