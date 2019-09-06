const express = require('express')
const app = express()
const db = require('./config/db')
const consig = require('consign')

consig()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db= db

app.listen(3000,()=>{
    console.log('Backend executando...')
})