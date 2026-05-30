const params = new URLSearchParams(window.location.search)
const movieRating = document.querySelectorAll(".movie__rating svg")
const similarMovies = document.querySelector(".similar-movie__cards")
function draw_card(card) {
    similarMovies.innerHTML += `
            <div class="films__card movie_card">
                <img class="films__card-img" src="http://185.72.144.247:7757${card.poster_URL}" alt="card-img">
                <h3 class="films__card-title">${card.title}</h3>
                <div class="films__card-wrapper">
                    <p class="films__card-desc">${card.year} г.</p>
                    <p class="films__card-desc">Рейтинг: ${card.rating}</p>
                </div>
                <a class="films__card-link" href="movie.html?id=${card.id}">Перейти</a>
        </div>
    `
}
async function get_films(year, id) {
    try{
        let res = await fetch("http://185.72.144.247:7757/films")
        if (!res.ok){
            throw new Error("Error" + res.status)
        }
        data = await res.json()
        let count = 0
        console.log(data)
        for (let i = 0; i < data.length; i++){
            if (data[i].year == year && data[i].id != id){
                draw_card(data[i])
                count++
            }
            if (count == 4)
                break
        }
    }
    catch(err){
        console.error(err)
    }
}
async function get_movie() {
    const id = params.get("id")
    try{
        const res = await fetch(`http://185.72.144.247:7757/films/${id}`)
        if (!res.ok){
            throw new Error("Ошибка! " + res.status)
        }
        const data = await res.json()
        if (data.poster_URL){
            document.querySelector(".movie__img").src = "http://185.72.144.247:7757" + data.poster_URL
        }
        else{
            document.querySelector(".movie__img").src = "img/no-poster.jpg"
        }
        document.querySelector(".movie__desc").textContent = data.desc
        const genres = data.genres
        for (let i = 0; i < genres.length - 1; i++){
            document.querySelector(".movie__genres").textContent += genres[i].name + " / "
        }
        document.querySelector(".movie__genres").textContent += genres[genres.length - 1].name
        document.querySelector(".movie__info-text.year").textContent = data.year ? data.year : "---"
        document.querySelector(".movie__info-text.age").textContent = data.age_rating + "+" ? data.age_rating : "---"
        document.querySelector(".movie__info-text.rating").textContent = data.rating ? data.rating : "---"
        document.querySelector(".movie__info-text.timing").textContent = data.duration + " мин" ? data.duration : "---"
        const rating = data.rating
        const ratingFloor = Math.floor(rating)
        const ratingDot = Math.trunc((rating - ratingFloor) * 100)
        for (let i = 0; i < ratingFloor; i++){
            movieRating[i].style.fill = "#B8231E"
        }
        if (ratingDot > 0){
        const gradient = `
            <lineargradient id="gradient">
                <stop offset = '${ratingDot}%' stop-color = '#B8231E'/>
                <stop offset = '${ratingDot}%' stop-color = 'transparent'/>
            </lineargradient>
        `
        movieRating[ratingFloor].innerHTML += gradient
        movieRating[ratingFloor].style.fill = 'url("#gradient")'
        }
        const actors = data.actors
        if (actors.length == 0){
            document.querySelector(".movie__actors-list").innerHTML = `
            <li class="movie__actors-name">Не указан</li>
            `
        }
        else{
            actors.forEach(actor => {
                document.querySelector(".movie__actors-list").innerHTML += `
                    <li class="movie__actors-name">${actor.name} ${actor.surname}</li>
            `
            });
        }
        get_films(data.year, id)
    }
    catch(err){
        console.error(err)
    }
}
window.addEventListener("load", function(){
    get_movie()
})