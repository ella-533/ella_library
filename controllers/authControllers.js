const { User } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../configs/tokenData')

const login = (req, res) => {
    // A. On vérifie que l'utilisateur qui tente de se connecter existe bel et bien dans notre BDD
    User.findOne({ where: { username: req.body.username } })
        .then((result) => {
            // B. Si l'utilisateur n'existe pas, on renvoie une réponse erreur Client
            if (!result) {
                return res.status(404).json({ message: `Le nom d'utilisateur n'existe pas.` })
            }
           // C. On vérifie que le mot de passe fourni pour se connecter corresponde au mot de passe de l'utilisateur dans la BDD
            bcrypt.compare(req.body.password, result.password)
                .then((isValid) => {
                    // D. Si le mot de passe n'est pas le bon, on renvoie une erreur Client, non authentifié
                    if (!isValid) {
                        return res.status(401).json({ message: `Le mot de passe n'est pas valide.` })
                    }
                    // E. On génère un token qui servira à vérifier dans chaque endpoint où ce sera nécessaire si l'utilisateur peut consommer la ressource. Dans l'état actuel, le token est utilisé dans le POST COWORKINGS
                    const token = jwt.sign({
                        data: 'result.username'
                    }, SECRET_KEY, { expiresIn: '10h' });

                    res.json({ message: `Login réussi`, data: token })
                })
        })
        .catch(error => {
            console.log(error.message)
        })
        .catch((error) => {
            res.status(500).json({ data: error.message })
        })
}

const protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.username = decoded.data
            next()
        } catch (error) {
            return res.status(403).json({ message: `Le token n'est pas valide.` })
        }
    }
}
// implémenter le middleware pour restreindre l'accès aux utilisateurs admin
const restrict = (req, res, next) => {

}

module.exports = { login , protect}