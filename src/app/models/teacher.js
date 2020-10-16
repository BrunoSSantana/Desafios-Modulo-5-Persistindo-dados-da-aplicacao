const db = require('../../config/dbt')
const {date} = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers`, function(err, results){
            if(err) throw `Database Erro! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO teachers (
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
            if(err) throw `Database Erro! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Erro! ${err}`
            callback(results.rows[0])
        })
    },
    update(data, calback){
        const query = `
            UPDATE teachers SET
            name=($1),
            avatar_url=($2),
            birth_date=($3),
            email=($4),
            school_year=($5),
            workload=($6)
            WHERE id = $7
        `
        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.email,
            data.school_year,
            data.workload,
            data.id
        ]
        db.query(query, values, function(err, results){
            if(err) throw `Database Erro! ${err}`

            calback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
}