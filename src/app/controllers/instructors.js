
const { age, dateUtc, graduation, dateTeacher } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {

    index(req, res) {
        return res.render('teachers/index')
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
    
        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                create_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `        
        const values = [
            req.body.avatar_url,
            req.body.name,
            dateUtc(req.body.birth_date).iso,
            req.body.education_level,
            req.body.classtype,
            req.body.subjects_taught,
            dateUtc(Date.now()).iso,
        ]
// LEMBRETE: REFATORAR A ENTRADA DE DADOS
        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error!")
            return res.redirect(`/teachers/${results.rows[0].id}`)
        })
    
        return
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
    
        return 
    },
    delete(req, res) {
    
        return
    }

}
