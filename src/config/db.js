const {} = require("pg")

module.exports = new Pool({
    user: 'bruno',
    password: "96672286",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})