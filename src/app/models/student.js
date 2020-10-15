const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students`, function(err, results){
            if(err) return res.send(`Database Error! + ${err}`)
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                birth_date,
                email,
                school_year,
                workload,
                create_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.email,
            data.school_year,
            data.workload,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) return res.send(`Database Error! + ${err}`)

            callback(results.rows[0])
        })
    }
}