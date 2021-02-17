const express= require('express')
const app = express()
const connectDB = require('./config/db')
connectDB()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/api/users',require('./routes/api/users'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/friends',require('./routes/api/friends'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/auth',require('./routes/api/auth'))

app.get('/',(req,res)=>{res.send("API is listening")})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{console.log(`Server listening to port ${PORT}`)})