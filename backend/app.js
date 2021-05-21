const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()
const path = require('path')
const userRouter = require('./routers/userRouter.js')
const cardRouter = require('./routers/cardRouter.js')



//middleWare
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors())

//mongoose connection
mongoose.connect("mongodb://localhost:27017/aliahealth",
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
},(err) => {
    if(err) throw err
    console.log("Connected to mongoose")
}
)

app.get('/',(req,res) =>{
    res.send('health check ok')
})


app.use('/user',userRouter)
app.use('/card',cardRouter)

app.listen(port,(err)=>{
    if(err) throw err
    console.log(`Server running on port ${port}`)
})