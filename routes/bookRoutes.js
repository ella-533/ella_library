const express = require('express')
const router = express.Router()
const { findAllBooks, findBookByPk, createBook, updateBook, deleteBook } = require('../controllers/bookControllers')
const { protect, restrict } = require('../controllers/authControllers')

const multer = require('../middleware/multer-config');

router
    .route('/')
    .get(findAllBooks)
    .post(protect, multer, restrict, createBook)

router
    .route('/:id') 
    .get(findBookByPk)
    .put(protect, restrict , multer, updateBook)
    .delete(protect, restrict, deleteBook)


    
module.exports = router