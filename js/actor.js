
const actorsList = document.querySelector(".actors_list__cards")
const actorModal = document.querySelector(".actor_modal")
const actorsCards = document.querySelector(".actors-cards")

const modalClose = document.querySelector(".actor_modal__close")
const modalCloseBtn = document.querySelector(".actor_modal__close-btn")

const actorsRecentCards = document.querySelector(".actors_recent__cards")

let data = []
const pagination = document.querySelector(".films__pagination")
const paginationNumbers = document.querySelectorAll(".films__pagination-number")
let page = 1

let actorsRecent = localStorage.getItem("actors") ? JSON.parse(localStorage.getItem("actors")) : []
async function get_actor_data(id){
    try{
        const res = await fetch(`http://185.72.144.247:7757/actors/${id}`)
        if (!res.ok){
            throw new Error("Ошибка!" + res.status)
        }
        const actor_data = await res.json()
        document.querySelector(".actor_modal__img").src = `http://185.72.144.247:7757${actor_data.image_URL}`
        document.querySelector(".actor_modal__name").innerHTML = `${actor_data.name} <br> ${actor_data.surname}`
        document.querySelector(".actor_modal__age").textContent = `Возраст: ${actor_data.age} Лет`
        const films = actor_data.films
        document.querySelector(".movie__actors-list").innerHTML = ""
        films.forEach(film => {
            document.querySelector(".movie__actors-list").innerHTML += `
            <li class="movie__actors-name">${film.title}</li>
            `
        })
        document.querySelector(".actor_modal__text").textContent = actor_data.Biography
        actorModal.style.display = "block"
    }
    catch(err){
        console.error(err)
    }
}
function closeModal(){
    actorModal.style.display = "none"
}
modalClose.addEventListener('click', function(){
    closeModal()
})
modalCloseBtn.addEventListener('click', function(){
    closeModal()
})
actorsCards.addEventListener('click', function(event){
    const card = event.target.closest(".actor-card")
    if (card){
        const id = event.target.getAttribute("data-id")
        get_actor_data(id)
        actorsRecent.push(id)
        localStorage.setItem("actors", JSON.stringify(actorsRecent))
    }
})
pagination.addEventListener('click', function(event){
    const object = event.target
    if (object.classList.contains("films__pagination-number") && !object.classList.contains("number--active")){
        let flag = 0
        if (object.textContent == ">" && page != 6){
            flag = page + 1
        }
        if (object.textContent == "<" && page != 1){
            flag = page - 1
        }
        if (object.textContent == "1" || flag == 1){
            actorsList.innerHTML = ""
            draw_page(0, 15)
            page = 1
        }
        else if (object.textContent == "2" || flag == 2){
            actorsList.innerHTML = ""
            draw_page(15, 30)
            page = 2
        }
        else if (object.textContent == "3" || flag == 3){
            actorsList.innerHTML = ""
            draw_page(30, 45)
            page = 3
        }
        else if (object.textContent == "4" || flag == 4){
            actorsList.innerHTML = ""
            draw_page(45, 60)
            page = 4
        }
        else if (object.textContent == "5" || flag == 5){
            actorsList.innerHTML = ""
            draw_page(60, 75)
            page = 5
        }
        else if (object.textContent == "6" || flag == 6){
            actorsList.innerHTML = ""
            draw_page(75, 81)
            page = 6
        }
        paginationNumbers.forEach(elem => {
            elem.classList.remove("number--active")
            if (elem.textContent == page){
                elem.classList.add("number--active")
            }
        })
    }
})
function draw_page(start, end){
    for (let i = start; i < end; i++){
        draw_actor_card(data[i], actorsList)
    }
}
function draw_actor_card(actor){
    actorsList.innerHTML += `
    <div class="actors_list__cards actor-card" data-id = "${actor.id}">
        <img class="actors_list__card-img actor-img" src="http://185.72.144.247:7757${actor.image_URL}" alt="card-img">
        <h3 class="actors_list__card-title actor-name">${actor.name} ${actor.surname}</h3>
    </div>
    `
}
function draw_actor_card(actor, elem){
    elem.innerHTML += `
    <div class="actors_list__cards actor-card" data-id = "${actor.id}">
        <img class="actors_list__card-img actor-img" src="http://185.72.144.247:7757${actor.image_URL}" alt="card-img">
        <h3 class="actors_list__card-title actor-name">${actor.name} ${actor.surname}</h3>
    </div>
    `
}

async function get_all_actors(){
    try{
        const res = await fetch("http://185.72.144.247:7757/actors")
        if (!res.ok){
            throw new Error("Ошибка!" + res.status)
        }
        data = await res.json()
        for (let i = 0; i < 15; i++){
            draw_actor_card(data[i], actorsList)
        }
        const actorsHistory = data.filter(actor => actor.id in actorsRecent)
        actorsHistory.forEach(actor =>{
            draw_actor_card(actor, actorsRecentCards)
        })
    }
    catch(err){
        console.error(err)
    }
}
window.addEventListener('load', function(){
    get_all_actors()
    if (actorsRecent.length == 0){
        document.querySelector(".actors_recent").style.display = "none"
    }
})