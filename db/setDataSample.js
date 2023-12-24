const mockBooks = require('./mock-books')
const mockUsers = require('./mock-users')
const bcrypt = require('bcrypt')

const setBooks = (Book) => {
mockBooks.forEach((element) => {
    const newBook = { ...element }
    Book.create(newBook)
        .then(() => { })
        .catch((error) => {
            console.log(error.message)
        })
})
}
const setUsers = (User) => {
    mockUsers.forEach(user => {
        bcrypt.hash(user.password, 10)
            .then(hashResult => {
                User.create({ ...user, password: hashResult })
                    .then(() => { })
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
    })
}

const setRoles = (Role) => {
    Role.create({ label: "admin" })
    Role.create({ label: "edit" })
}

module.exports = { setBooks, setUsers, setRoles }