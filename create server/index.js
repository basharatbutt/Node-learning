const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send("Hello kya hal hai")
})

app.listen(3000, () => {
  console.log('Successfully Connected on port 3000.')
})