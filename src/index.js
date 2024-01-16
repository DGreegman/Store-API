require('express-async-errors')
const dotenv = require('dotenv')
const express = require('express')
const notFound = require('./Middleware/not-found')
const errorHandller = require('./Middleware/error-handler')
const connectDB = require('./DB/connectdb')
const productRoute = require('./Routes/productRoutes')
const app = express()

dotenv.config()



// middleware
app.use(express.json())

// Routes
app.use('/api/v1/products', productRoute)

// not-found route
app.use(notFound)
app.use(errorHandller)

port = process.env.PORT || 3000

const start = async() => {
    try {
        // connectDB
        connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()


