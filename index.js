document.addEventListener('DOMContentLoaded', () => {
    
//url
    const url= "http://localhost:3000/movies"
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
    
 //smash trash button const   
    const smashBtn= document.querySelector("#smash")
    const trashBtn= document.querySelector("#trash")
    
    let smashNumber= document.querySelector("#smash-span")
    let trashNumber= document.querySelector("#trash-span")

//comment form const
    const newCommentForm= document.querySelector("#new-comment-form")
    const newCommentDetails= document.querySelector("#new-comment-details")






//fetching the entire db.json object
//fetch function
    function getMovies() {
        fetch(url)
        .then((res) => res.json())
        .then (movies => {
            movies.map(movie => {
                renderMovie(movie) // going through the conditional to determine next steps
                //topFiveMovies(movie) //we no longer need this because renderMovie(movie) is going to do this
                
                
            })
        })

    }
//invoke this fetchMovies function
     getMovies()   


//if else
    function renderMovie(movie) {
        if (movie.id < 6){
            topFiveMovies(movie)

        } else if (movie.id >= 6) {
            userFaves(movie)
        }
    }


//populate top 5 movies on left 
    function topFiveMovies(movie){
        const top5Img= document.createElement("img")
        top5Img.src= movie.image
        top5Section.appendChild(top5Img)

        top5Img.addEventListener("click", (e) => {

            renderDetails(movie)

        })
    }


//populate user favorites on the right
    function userFaves(newMovie){
        const favesImg= document.createElement("img")
        favesImg.src= newMovie.image
        userFavesSection.appendChild(favesImg)

        favesImg.addEventListener("click", (e) => {
            if (e.altKey){ //permits removal
                //favesImg.remove()
                deleteMovie(newMovie)
            } else {
                renderDetails(newMovie)
            }

            //renderDetails(newMovie)

        })
    }

//removal function
    function deleteMovie(movie){
        fetch(`${url}/${movie.id}`, {
            method: "DELETE"
        })

    }








//function for add event listener
//w parameter of "placement" aka top5 being passed through as param, goes to wherever top 5 should go etc. 
    function renderDetails(movie){
        detailImg.src= movie.image
        detailTitle.textContent= movie.title
        detailYear.textContent= movie.year
        detailRating.textContent= `${movie.rating}/10`
        detailSales.textContent= movie.sales //ok bc doesn't EXIST in the faves
        userName.textContent=  movie.name? `@${movie.name}` : "" //does movie.name exist? if true, this is the movie name, if false, nothing.
        smashNumber.textContent= movie.smash
        trashNumber.textContent= movie.trash

        
        
    }
        

//fetch for single object parameter of large object
//function for fetch
    function getOneMovie(){
        return fetch(`${url}/5`)
        .then((res) => res.json())
        .then (movie => {
                
            renderDetails(movie) 
            buttons(movie) 
            
        })
    }
        //invoke getOneMovie function
        getOneMovie()

        
//user buttons
//do we want these here? this works on it's own
        
    function buttons(){
        smashBtn.addEventListener("dblclick", (e) => {
                smashNumber.textContent= Number(smashNumber.textContent)+1
                    
        })
            
        trashBtn.addEventListener("dblclick", (e) => {
                trashNumber.textContent= Number(trashNumber.textContent)+1
            
        })
    }

   

        
//new movie form
    newMovieForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let newMovieObj= {
            name: e.target["user-name"].value, //can use the name attribute to reference this area when there are no id's
            image: movieImgForm.value,
            title: movieTitleForm.value,
            year: releaseYearForm.value,
            rating: movieRatingForm.value,
            smash: 0,
            trash: 0,
            comments: []
            
                
        }
            
            userFaves(newMovieObj)
            
            e.target["user-name"].value= "" //can use the name attribute to reference this area when there are no id's
            movieImgForm.value= ""
            movieTitleForm.value= ""
            releaseYearForm.value= ""
            movieRatingForm.value= ""


            //post invocation in here because we want to POST the contents of these instructions
            post(newMovieObj)
    })
        
        
        
        
        newCommentForm.addEventListener("submit", (e) => {
            e.preventDefault()
            let newCommentLi = document.createElement("li")
            newCommentLi.textContent= e.target["new-comment"].value
            newCommentDetails.appendChild(newCommentLi)
            e.target["new-comment"].value= ""
            
            //handling patch
            // newCommentLi.addEventListener("change", (e) => {
            //     handlePatch(e, newCommentLi)
            // })

        })
        

        // function patch(url, body){
        //     return fetch(url, {
        //         method: "PATCH",
        //         headers: {"content-type": "application/json"},
        //         body: JSON.stringify(body)
        //     })
        // .then(res => res.json())
        // }
    
        // function handlePatch(e, movies){
        //     e.preventDefault()
        //     patch(`${url}/${movies.id}`, {comments: e.target.value})
        //     .then(data => console.log(data))

        // }







//persistence

//POST
//this ensures what the user submits, STAYS and is ADDED to the db.json object
function post(movie){
    fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(movie)
    })

}













        


//end of DOM Content Loaded event
})