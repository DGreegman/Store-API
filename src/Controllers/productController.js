const Product = require('../Models/productModel')

const getAllProducts = async(req, res) =>{
    console.log(req.query)
    // throw new Error('Testing async errors')
    // , company, name, sort, fields, numericFilters
    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }

    // we're using regex from mongoDB to search for the name of the product cause the name is not only one word
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }

    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // for pagination, limit and skip(num of product to skip)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    // getting all products from the database and sending it to the client 
    // const products = await Product.find(queryObject)
    // res.status(200).json({products, numproducts:products.length}

    const products = await result
    res.status(200).json({products, numproducts:products.length})

}

// getting all static products
const getAllStaticProducts = async(req, res) =>{
    const products = await Product.find({featured:true})
    res.status(200).json({products, numproducts:products.length})

}

module.exports = {
    getAllProducts, getAllStaticProducts
}