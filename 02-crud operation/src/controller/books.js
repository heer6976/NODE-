const books = require('../module/books');


const getAll = (req, res) => {
    res.json({
        msg: "Get All of these Books" 
    })
}

const getOne = (req, res) => {
    res.json({
        msg: "Get only one Book"
    })
}

const createOne = (req, res) => {
    res.json({
        msg: "Books can be Created"
    })
}

const updateOne = (req, res) => {
    res.json({
        data: "Books has been Updated"
    })
}

const deleteOne = (req, res) => {

    }
    res.json({
        data: "Books has been Deleted"
    })


module.exports = { getAll, getOne, createOne, updateOne, deleteOne }