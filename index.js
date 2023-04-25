const url = 'http://localhost:3000/movies'
const topFive = document.querySelector('#top-5')
const movieDetail = document.querySelector('#movie-detail')
const imageDetail = document.querySelector('#movie-details-img')
const movieTitles = document.querySelector('#title')
const movieReleaseYear = document.querySelector('#release-year')
const movieRating = document.querySelector('#rating')
const movieSales = document.querySelector('#sales')
const newMovieForm = document.querySelector('#new-movie-form')
const newUserName = document.querySelector('#user-name')
const newMovieImage = document.querySelector('#movie-image')
const newMovieTitle = document.querySelector('#movie-title')
const newMovieReleaseYear = document.querySelector('#new-release-year')
const newMovieRating = document.querySelector('#movie-rating')
const usersFavoriteMovies = document.querySelector('#user-favorites')
const smashButton = document.querySelector('#smash')
const trashButton = document.querySelector('#trash')
const smashNumber = document.querySelector('#smash+span')
const trashNumber = document.querySelector('#trash+span')

let movieArray
let currentMovie

function getMovies() {
    return fetch(url)
        .then(response => response.json())
        .then(movies => {
            movieArray = movies
            currentMovie = movieArray[0]

            movieArray.map(movie => {
                addMovieImage(movie)
            })
            movieDetails(currentMovie)
        })
}

function addMovieImage(movie) {
    const movieImg = document.createElement('img')
    movieImg.src = movie.image
    movieImg.alt = movie.title
    topFive.append(movieImg)

    movieImg.addEventListener('click', () => {
        movieDetails(movie)
        currentMovie = movie
    })
}

const movieDetails = (m) => {
    imageDetail.src = m.image
    movieTitles.textContent = m.title
    movieReleaseYear.textContent = m.year
    movieRating.textContent = m.rating
    movieSales.textContent = m.sales
}

newMovieForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newlyAddedMovie = {
        name: e.target['user-name'].value,
        image: newMovieImage.value,
        title: newMovieTitle.value,
        year: newMovieReleaseYear.value,
        rating: newMovieRating.value
    }
    userFavorites(newlyAddedMovie)

    e.target['user-name'].value = ''
    newMovieImage.value = ''
    newMovieTitle.value = ''
    newMovieReleaseYear.value = ''
    newMovieRating.value = ''
})

function userFavorites(newMovie) {
    const favImg = document.createElement('img')
    favImg.src = newMovie.image
    usersFavoriteMovies.append(favImg)

    favImg.addEventListener('click', () => {
        newMovieDetails(newMovie)
        currentMovie = newMovie
    })
}

const newMovieDetails = (nm) => {
    imageDetail.src = nm.image
    newUserName.textContent = `@${nm.name}`
    movieTitles.textContent = nm.title
    movieReleaseYear.textContent = nm.year
    movieRating.textContent = nm.rating
    movieSales.textContent = ''
}

smashButton.addEventListener('dblclick', (e) => {
    e.preventDefault()
    smashNumber.textContent = Number(smashNumber.textContent)+1
})

trashButton.addEventListener('dblclick', (e) => {
    e.preventDefault()
    trashNumber.textContent = Number(trashNumber.textContent)+1
})

getMovies()