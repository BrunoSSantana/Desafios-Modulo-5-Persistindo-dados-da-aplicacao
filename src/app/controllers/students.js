const student = require('../models/student')
module.exports = {

    index(req, res) {
        student.all(function(students){
            return res.render("students/index", {students})
        })
    },

    create(req, res) {
        return res.render('students/create')
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
           
        return
    },
    edit(req, res) {

        return
    },
    update(req, res) {
    
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(`Preencha todos os campos`)
            }
        }
    
        student.create(req.body, function(student) {
            return res.render(`student/${student.id}`)
        })
    },
    delete(req, res) {
    
        return
    }

}
