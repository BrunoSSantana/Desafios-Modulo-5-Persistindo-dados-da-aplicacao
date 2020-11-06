const student = require('../models/student')
const {age, date, education} = require('../../lib/utils')
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
            callback(students){

                const pagination = {
                    filter,
                    total: Math.ceil(students[0].total / limit),
                    page
                }
    
                return res.render("students/index", {students, pagination, filter})
            }
        }

        student.paginate(params)
    },
    create(req, res) {
        student.teacherOptions(function(options){
            // console.log(options)
            return res.render('students/create', {teacherOptions:options})
        })
    },
    post(req, res) {

        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }
        
        student.create(req.body, function(students){
            return res.redirect(`students/${students.id}`)
        })
        
    },
    show(req, res) {
        student.find(req.params.id, function(student){
            if(!student) return res.send("Student not found!")

            student.age = age(student.birth_date)
            student.create_at = date(student.create_at).format
            student.birth_date = date(student.birth_date).format
            student.school_year = education(student.school_year)

            return res.render("students/show", {student})
        })
    },
    edit(req, res) {
        student.find(req.params.id, function(students){
            if(!student) return res.send("Student not found!")

            students.birth_date = date(students.birth_date).iso

            student.teacherOptions(function(options){
                return res.render('students/edit', {student:students, teacherOptions:options})
            })

        })
    },
    update(req, res) {
    
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }
    
        student.update(req.body, function(){
            return res.redirect(`students/${req.body.id}`)
        })
    },
    delete(req, res) {
        student.delete(req.body.id, function(){
            return res.redirect('/students')
        })
    }

}
