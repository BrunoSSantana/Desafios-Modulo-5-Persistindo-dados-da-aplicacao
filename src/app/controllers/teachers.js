const teacher = require('../models/teacher')
const {age, date, graduation} = require('../../lib/utils')
module.exports = {

    index(req, res) {
        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers){
                return res.render("teachers/index", {teachers, filter})
            }
        }

        teacher.paginate(params)

        // if(filter){
        //     teacher.findBy(filter, function(teachers){
        //         return res.render("teachers/index", {teachers, filter})
        //     })
        // }else{
        //     teacher.all(function(teachers){
        //         return res.render("teachers/index", {teachers})
        //     })
        // }

    },
    create(req, res) {
        return res.render('teachers/create')
    },
    post(req, res) {

        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }
        
        teacher.create(req.body, function(teachers){
            return res.redirect(`teachers/${teachers.id}`)
        })
        
    },
    show(req, res) {
        teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("teacher not found!")

            teacher.age = age(teacher.birth_date)
            teacher.create_at = date(teacher.create_at).format
            teacher.birth_date = date(teacher.birth_date).format
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.education_level = graduation(teacher.education_level)

            return res.render("teachers/show", {teacher})
        })
    },
    edit(req, res) {
        teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send("teacher not found!")

            teacher.birth_date = date(teacher.birth_date).iso

            return res.render("teachers/edit", {teacher})
        })
    },
    update(req, res) {
    
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }
    
        teacher.update(req.body, function(){
            return res.redirect(`teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        teacher.delete(req.body.id, function(){
            return res.redirect('/teachers')
        })
    }

}
