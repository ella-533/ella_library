const express = require('express')
const router = express.Router()
const { findAllBooks, findBookByPk, createBook, updateBook, deleteBook } = require('../controllers/bookControllers')
const { protect } = require('../controllers/authControllers')

router
    .route('/')
    .get(findAllBooks)
    .post(protect, createBook)

router
    .route('/:id') 
    .get(findBookByPk)
    .put(protect, updateBook)
    .delete(protect, deleteBook)
    
module.exports = router