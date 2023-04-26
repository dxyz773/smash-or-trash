document.addEventListener('DOMContentLoaded', () => {


    // -Click the movie poster to display movie details //GET

    // -Double click the like to add a like that persists 
    
    // -Double click the dislike to add a dislike that persists 
    
    // -Submits a favorite movie to the page using a form that persists 
    
    
    //first fetch const top 5 section
    const top5Section= document.getElementById("top-5")
    
    //second fetch const details section
    const detailImg= document.querySelector("#movie-details-img")
    const detailTitle= document.querySelector("#title")
    const detailYear= document.querySelector("#release-year")
    const detailRating= document.querySelector("#rating")
    const detailSales= document.querySelector("#sales")
    
    //user favorites const
    const userFavesSection= document.querySelector("#user-favorites")
    const newMovieForm= document.querySelector("#new-movie-form")    
    
    //form const
    const userNameForm= document.querySelector("#user-name")
    const movieImgForm= document.querySelector("#movie-image")
    const movieTitleForm= document.querySelector("#movie-title")
    const releaseYearForm= document.querySelector("#new-release-year")
    const movieRatingForm= document.querySelector("#movie-rating")
    const userName= document.querySelector("#movie-details h4")



fetch("http://localhost:3000/movies")
.then((res) => res.json())
.then (movies => {
    movies.map(movie => {
        const top5Img= document.createElement("img")
        top5Img.src= movie.image
        top5Section.appendChild(top5Img)

        top5Img.addEventListener("click", (e) => {
            e.preventDefault()
            detailImg.src= movie.image
            detailTitle.textContent= movie.title
            detailYear.textContent= movie.year
            detailRating.textContent= `${movie.rating}/10`
            detailSales.textContent= movie.sales

        })
    })
})


fetch("http://localhost:3000/movies/1")
.then((res) => res.json())
.then (movie => {
        detailImg.src= movie.image
        detailTitle.textContent= movie.title
        detailYear.textContent= movie.year
        detailRating.textContent= `${movie.rating}/10`
        detailSales.textContent= movie.sales
    
})


    newMovieForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newMovieObj= {
            name: e.target["user-name"].value, //can use the name attribute to reference this area when there are no id's
            image: movieImgForm.value,
            title: movieTitleForm.value,
            year: releaseYearForm.value,
            rating: movieRatingForm.value,
            //sale: ""
        }
        
        userFaves(newMovieObj)

        e.target["user-name"].value= "" //can use the name attribute to reference this area when there are no id's
        movieImgForm.value= ""
        movieTitleForm.value= ""
        releaseYearForm.value= ""
        movieRatingForm.value= ""
    })


function userFaves(newMovie){
        const favesImg= document.createElement("img")
        favesImg.src= newMovie.image
        userFavesSection.appendChild(favesImg)



        favesImg.addEventListener("click", (e) => {
            e.preventDefault()
            userName.textContent= `@${newMovie.name}`
            detailImg.src= newMovie.image
            detailTitle.textContent= newMovie.title
            detailYear.textContent= newMovie.year
            detailRating.textContent= `${newMovie.rating}/10`
            detailSales.textContent= ""
    

        })
}

const smashBtn= document.querySelector("#smash")
const trashBtn= document.querySelector("#trash")

let smashNumber= document.querySelector("#smash+span")
let trashNumber= document.querySelector("#trash+span")


smashBtn.addEventListener("dblclick", (e) => {
    e.preventDefault()
    smashNumber.textContent= Number(smashNumber.textContent)+1
    
})

trashBtn.addEventListener("dblclick", (e) => {
    e.preventDefault()
    trashNumber.textContent= Number(trashNumber.textContent)+1

})

const newCommentForm= document.querySelector("#new-comment-form")
//const newCommentUl= document.querySelector("#new-comment")
const newCommentDetails= document.querySelector("#new-comment-details")

newCommentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newCommentLi = document.createElement("li")
    newCommentLi.textContent= e.target["new-comment"].value
    newCommentDetails.appendChild(newCommentLi)
    e.target["new-comment"].value= ""
    


})









//end of DOM Content Loaded event
})