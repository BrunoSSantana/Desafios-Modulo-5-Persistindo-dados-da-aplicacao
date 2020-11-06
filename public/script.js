/* const cards = document.querySelectorAll('.bootcamp')
const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')
const maximize = document.querySelector('.maximize')
for ( let card of cards) {
    card.addEventListener("click", function () {
        const bootcamp = card.getAttribute("id")
        window.location.href = `/conteudos/${bootcamp}`
        console.log("OPA")
    })
}
 */
/* document.querySelector('.close-modal').addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    modal.classList.remove('maximize')
})
maximize.addEventListener('click', function () {
    if (modal.classList.contains('maximize')) {
        modal.classList.remove('maximize')
    } else {
        modal.classList.add('maximize')
    }
}) */
//Active

const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')

    }
}

const cards = document.querySelectorAll('.teacher')
    
for (let card of cards) {
    card.addEventListener("click", function (){
        const teacher = card.getAttribute("id")
        window.location.href = `/instructors/${teacher}`
        console.log("opa")
    })
}

// Paginação

function paginate(totalPages, selectPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firstAndLast = currentPage == 1 || currentPage == totalPages
        const pagesAffter = currentPage <= selectPages + 2
        const pagesBefore = currentPage >= selectPages - 2

        if(firstAndLast || pagesAffter && pagesBefore){
            
            if(oldPage && (currentPage - oldPage) > 2 ){
                pages.push("...")
            }

            if(oldPage && (currentPage - oldPage) == 2 ){
                pages.push(currentPage - 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }
    return pages
}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(total, page)

    console.log(pages)

    let elements = ""

    for (let page of pages){

        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        }else{
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            }else{
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }

    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination){
    createPagination(pagination)
}

