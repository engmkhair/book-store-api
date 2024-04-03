const express=require('express')
const logger=require("./middleware/logger")
const errors=require('./middleware/errors')
require("dotenv").config()
const {notFound,errorHandler} = require('./middleware/errors')
const connectToDB = require('./config/db')
const app=express()
app.use(express.json())

app.use(logger)

//connect to database
connectToDB()
//routes
app.use("/api/books",require("./routes/books"))
app.use("/api/authors",require("./routes/authors"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/users",require("./routes/users"))
//error handler middleware
app.use(notFound)

app.use(errorHandler)

const port=process.env.PORT 
app.listen(port,()=>console.log(`server is running in ${process.env.NODE_ENV} made on port${port}`))
