const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')
const teachers = require('./data.json')

routes.get('/', function(req, res) {
    return res.redirect('/instructors')
})

routes.get('/instructors', function(req, res) {
    return res.render('instructors/index')
})

routes.get("/instructors/create", function(req, res) {
    return res.render('instructors/create.njk')
})

routes.get("/instructors/teachers", function(req, res){
    return res.render('instructors/teachers', {teachers})
})
//pegando os dados do frontend

routes.post("/instructors", instructors.post )

routes.get('/members', function(req, res){
    return res.render('members')
})

module.exports = routes