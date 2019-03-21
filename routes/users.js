var router = require('express').Router()
var http = require('../utils/http')
var Paseto = require('paseto.js')

router.get('/users', (req, res) => {
    http.get(process.env.USERS_API, req.query, req.headers.authorization, (data) => {
        return res.status(200).json(data)
    }, (err) => {
        return res.status(400).json(err)
    })
})

router.post('/users', (req, res) => {
    http.post(process.env.USERS_API, req.body, req.query, req.headers.authorization, (data) => {
        return res.status(201).json(data)
    }, (err) => {
        return res.status(400).json(err)
    })
})

router.post('/authentications', (req, res) => {
    http.post(`${process.env.USERS_API}/authentications`, req.body, req.query, null, (data) => {
        pk = new Paseto.PublicKey.V2()
        pk.inject(Buffer.from(process.env.AUTH_PUBLIC_KEY, 'hex'), null)
        
        if (data) {
            return new Paseto.V2().verify(data.token, pk, '', (err, message) => {
                if (err) {
                    return res.status(500).json(err)
                }

                message = JSON.parse(message)
                message.token = data.token

                return res.status(200).json(message)
            }, req)
        }
    }, (err) => {
        return res.status(401).json(err)
    })
})

module.exports = router
