const Book = require("../models/books")

const getAll =(req, res) => {
    try {
        const { name, author, price} = req.body

        Book.push({ name, author, price })

        return res.json({
            msg: "Get all of these Books"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: "server error"
        })
    }
}

const getOne =(req, res) => {
try {
    const bookId = Number(req.params["bookId"])

    if (isNaN(bookId)) return res.json({ msg: "not valid input"})

        if (!Book[bookId]) return res.json({ msg: "Book not found"})
    
            const { name, author, price} = req.body
    
            Book.push({ name, author, price })
    
            return res.json({
                msg: "Get only one Book"
            })
        } catch (error) {
            console.log(error)
            return res.json({
                msg: "server error"
            })
        }
}

const createOne = (req, res) => {
    try {
        const { name, author, price} = req.body

        Book.push({ name, author, price })

        return res.json({
            msg: "Book has been created"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: "server error"
        })
    }
}

const updateOne = (req, res) => {
   try{
    const bookId = Number(req.params["bookId"])

    if (isNaN(bookId)) return res.json({ msg: "not valid input"})

    if (!Book[bookId]) return res.json({ msg: "Book not found"})

        const { name, author, price} = req.body

        Book.push({ name, author, price })

        return res.json({
            msg: "book has been updated"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: "server error"
        })
    }
}

const deleteOne = (req, res) => {
    try {
    const bookId = Number(req.params["bookId"])

    if (isNaN(bookId)) return res.json({ msg: "not valid input"})

    if (!Book[bookId]) return res.json({ msg: "Book not found"})

    Book.splice(bookId, 1)
    return res.json({
        data: "Book can be deleted"
    })
} catch (error) {
    console.log(error)
    return res.json({
        msg: "server error"
    })
}
}

module.exports = { getAll, getOne, createOne, updateOne, deleteOne}