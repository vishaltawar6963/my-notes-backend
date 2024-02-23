const express = require('express')

const app  = express();
const notes = require('./data/notes')
const dotenv = require('dotenv');
var cors = require('cors')
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const  notesRoutes = require('./routes/notesRoute')
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
dotenv.config()

connectDb()
app.use(cors())
app.use(express.json())


app.get('/' , (req , res)=>{
    res.send("api is running")
})

app.use('/api/users' ,userRoutes)
app.use('/api/notes' ,notesRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT , console.log(`server has started on port ${PORT}`))

