// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError } = require('sequelize')
const { Book } = require('../db/sequelizeSetup')
const SECRET_KEY = require('../configs/tokenData')

const findAllBooks = (req, res) => {
    Book.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findBookByPk = (req, res) => {
    Book.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un book a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun book n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createBook = (req, res) => {
    const newBook = { ...req.body }
    Book.create(newBook)
        .then((book) => {
            res.status(201).json({ message: 'Le book a bien été créé', data: book})
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
        })
}

const updateBook = (req, res) => {
    Book.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                return result.update(req.body)
                    .then(() => {
                        res.status(201).json({ message: 'Le book a bien été mis à jour.', data: result })
                    })
                    .catch(error => {
                        res.status(500).json({ message: 'La mise à jour a échoué.', data: error.message })
                    })
            } else {
                res.status(404).json({ message: `Aucun book à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
        })
}

const deleteBook = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Book.findByPk(req.params.id)
        .then((result) => {
            // B. Si un book correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                return result.destroy()
                    // C. Si le book est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `Le book a bien été supprimé.`, data: result })
                    })
                    
            } else {
                // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Aucun book trouvé.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllBooks, findBookByPk, createBook, updateBook, deleteBook }