module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && (today.getDate - birthDate.getDate) <= 0 ) {
            return age = age - 1
        }

        return age
    },
    graduation(graduation) {
        switch(graduation) {
            case 'esi':
                return 'University education Incomplete'
            case 'esc':
                return 'University education Complete'
            case 'm':
                return 'Masters'
            case 'd':
                return 'Doctorate'
        }
    },
    
    dateTeacher(timestamp) {
        const data = new Date(timestamp)

        const dia = data.getDate().toString().padStart(2, "0")
        const mes = (data.getMonth()+1).toString().padStart(2, "0")
        const ano = data.getFullYear()
        
        return `${dia}/${mes}/${ano}`
    },
    date(timestamp) {
        const data = new Date(timestamp)

        const dia = data.getUTCDate().toString().padStart(2, "0")
        const mes = (data.getUTCMonth()+1).toString().padStart(2, "0")
        const ano = data.getUTCFullYear()

        return {
            dia,
            mes,
            ano,
            iso: `${ano}-${mes}-${dia}`,
            birthday: `${dia}/${mes}`,
            format: `${dia}/${mes}/${ano}`
        }
    },
    education(education) {
        switch(education) {
            case '5':
                return '5º Ano do Ensino Fundamental'
            case '6':
                return '6º Ano do Ensino Fundamental'
            case '7':
                return '7º Ano do Ensino Fundamental'
            case '8':
                return '8º Ano do Ensino Fundamental'
            case '9':
                return '9º Ano do Ensino Fundamental'
            case '1':
                return '1º Ano do Ensino Médio'
            case '2':
                return '2º do Ensino Médio'
            case '3':
                return '3º Ano do Ensino Médio'
        }
    }
}