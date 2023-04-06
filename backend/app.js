const express = require('express')

const { sequelize, User,Token  } = require('./models')

const app = express()
app.use(express.json())

const userRouter = require('./routers/user')
const accountRouter = require('./routers/account')

const port = process.env.PORT || 3000

app.use(userRouter)
app.use(accountRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



const main = async () => {

  // remove the force option to avoid dropping the table
  await sequelize.sync()
  
}

main()