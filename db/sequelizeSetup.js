// B. On importe le gabarit du Model Book défini dans le fichier ./models/Book'
const BookModel = require('../models/bookModel')
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const { Sequelize, DataTypes } = require('sequelize');
const { setBooks, setUsers, setRoles } = require('./setDataSample')

//A. On créé une instance de bdd qui communique avec Xampp
const sequelize = new Sequelize('ella_library', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});
// C. On instancie un Model qui permettra d'interpréter le Javascript avec la Table SQL correspondante
const Book = BookModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)

// Ecrire la relation entre book et User
Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Book)
Book.belongsTo(User)


// D. On synchronise la BDD avec les models défini dans notre API
sequelize.sync({ force: true })
    .then(() => {
        setBooks(Book)
        setUsers(User)
        setRoles(Role)
    })
    .catch(error => {
        console.log(error)
    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))
module.exports = { Book , User}