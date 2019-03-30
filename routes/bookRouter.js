const express = require('express')
const bookRouter = express.Router()
const Book = require('../models/bookModel')

bookRouter.route('/')
    // get all books
    .get((req,res)=>{
        Book.find({}, (err, books)=>{
            if (err) {
                res.sendStatus(400).json({msg: 'no books found'})
            }
            res.json(books)
        })
    })
    // add a book to bookStore DB
    .post((req, res) => {
        let book = new Book(req.body)
        book.save()
        res.status(201).send(book) 
    })

bookRouter.route('/:bookId')
    // get a specify book
    .get((req,res)=>{
        Book.findById(req.params.bookId, (err,book)=>{
            if (err) {
                res.sendStatus(400).json({msg: 'no book found with this ID'})
            }
            res.json(book)
        })
    })
    // update a book
    .put((req,res) => {
        Book.findById(req.params.bookId, (err, book) => {
            book.title = req.body.title
            book.author = req.body.author
            book.save()
            res.json(book)
        }) 
    })
    // delete a book
    .delete((req,res)=>{
        Book.findById(req.params.bookId, (err, book) => {
            book.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })

module.exports = bookRouter