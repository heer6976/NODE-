const books = require('../module/books');


const getAll = (req, res) => {
    res.json({
        msg: "Get All Books" 
    })
}

const getOne = (req, res) => {
    res.json({
        msg: "Get One Book"
    })
}

const createOne = (req, res) => {
    res.json({
        mag: "Book Created"
    })
}

const updateOne = (req, res) => {
    res.json({
        data: "Book Updated"
    })
}

const deleteOne = (req, res) => {
    res.json({
        data: "Book Deleted"
    })
}

module.exports = { getAll,getOne,createOne,updateOne, deleteOne }