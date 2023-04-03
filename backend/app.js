const express = require('express')

const { sequelize, User } = require('./models')

const app = express()
app.use(express.json())

const userRouter = require('./routers/user')
//const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000

app.use(userRouter)
//app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



const main = async () => {
  await sequelize.sync({ force: true })
}

main()