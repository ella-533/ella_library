const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.get('/', (req, res) => {
    res.json('Hello World !')
})

const bookRouter = require('./routes/bookRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')



app.use('/api/books', bookRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)

app.use('/images', express.static(__dirname + '/images'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})