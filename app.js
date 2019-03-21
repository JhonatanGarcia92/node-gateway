if (process.env.ENV == 'dev') {
    require('dotenv').config({
        silent: true
    })
}

var app = require('express')()

app.use(require('cors')())
app.use(require('body-parser').json())
app.use('/users', require('./routes/users'))

app.set('etag', false)
app.set('trust proxy', true)
app.listen(process.env.PORT)
