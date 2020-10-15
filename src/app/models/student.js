const db = require('../../config/db')
const {dateUtc, date} = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students`, function(err, results){
            if(err) return res.send("Database Error!")

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT TO students (
                avatar_url,
                name,
                birth_date,
                email,
                school_year,
                workload,
                create_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            dateUtc(data.birth_date).iso,
            data.email,
            data.school_year,
            data.workload,
            dateUtc(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error!")

            callback(results.rows[0])
        })
    }
}