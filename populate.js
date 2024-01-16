require('dotenv').config()

const connectdb = require('./src/DB/connectdb')

const Product = require('./src/Models/productModel')

const jsonProduct = require('./products.json')

const start = async () => {
    try {
        await connectdb(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log('Success')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()