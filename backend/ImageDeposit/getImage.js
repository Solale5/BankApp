const express = require('express')
const fs = require('fs')
const multer = require('multer')

const upload = multer({ dest: 'images/' })

const app = express()

// app.use('/images', express.static('images'))
app.get('/images/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then

  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

app.post('/backend/imageDeposit/images', upload.single('image'), (req, res) => {
  const imageName = req.file.filename
  const description = req.body.description

  // Save this data to a database probably

  console.log(description, imageName)
  res.send({description, imageName})
})

app.listen(5001, () => console.log("listening on port 5001"))
