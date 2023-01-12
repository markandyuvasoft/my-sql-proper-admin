const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const path = require("path");

var corOptions = {
    origin: 'https://localhost:8081'
}

// middleware..
app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// routers..
const router = require('./routes/user.js')

app.use('/api/products', router)


// static images use

app.use('/Images', express.static('./Images'))


// testing api....
app.get("/",(req,res)=>{

    res.json({message: 'hello from api'})
})


// port
const PORT = process.env.PORT || 8080

// server

app.listen(PORT, () => {

    console.log(`server is running on port ${PORT}`);
})