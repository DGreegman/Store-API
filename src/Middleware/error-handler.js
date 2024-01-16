const errorHandller = (err, req, res, next) => {
  console.log(err);
  /* if (err.name === 'ValidationError') {
    return res.status(422).json({ error: err.message })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: err.message })
  }
  if (err.name === 'MongoError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === 'MongoServerError') {
    return res.status(400).json({ error: err.message })
  } */

 
  return res.status(500).json({ msg: `Something Went Wrong Please Try Again` })
}

module.exports = errorHandller;