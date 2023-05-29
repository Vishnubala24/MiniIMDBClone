var favItems = localStorage.getItem('fav-items');
const favContainer = document.getElementById('fav-items');

// Fetches the movie by using IMDB ID
async function fetchMovie(id){
        
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=25d899ea&i=${id}`);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
}

// Generating HTML content for the display with movie details
function getHTMLContent(data){

    // console.log(data)
    if(data){
        
        let htmlData = (`<li class="list-group-item">
                        <span class="movie-item movie-title" data-id=${data.imdbID}> 
                            <i class="fa-duotone fa-video fa-fade"></i>
                            ${data.Title} 
                        </span>
                        <button class="fav-btn-rm btn btn-danger" data-id=${data.imdbID} id="${data.imdbID}">Remove from Favourites</button>
                    </li>`);
        
        return htmlData;
    }
}

// To display the favourite items 
async function displayFavItems(favItems){
    let favList = new Set(favItems.split(','));
    console.log(favList);
    let ul = document.getElementById('fav-items');
    ul.innerHTML = '';
    await favList.forEach( e => {
        if(e.length > 0){
            fetchMovie(e)
            .then(getHTMLContent)
            .then(function(data){
                ul.innerHTML += (data);
                deleteFavClickListener();
                addMovieClickListener();
            });
        }
    });
    
}

// Remove from favourite
function removeFromFav(){
    let movieId = this.getAttribute('data-id');
    document.getElementById(movieId).innerHTML = "Added To Favourites";
    document.getElementById(movieId).disabled = true;
    document.getElementById(movieId).style.backgroundColor = 'grey';
    let favList = new Set(localStorage.getItem('fav-items').split(','));
    favList.delete(movieId);
    let str = '';
    favList.forEach(e =>{
        str += (e +',');
    })
    console.log(movieId, str);
    localStorage.setItem('fav-items', str);
    displayFavItems(str);
}

// Adding listener to Remove from favourites
function deleteFavClickListener(){
    console.log('movieId');
    var favItems = document.getElementsByClassName('fav-btn-rm');
    for(var i=0;i<favItems.length;i++){
        favItems[i].addEventListener('click', removeFromFav);
    }
}


// Taking to movie page if any movie is clicked
function clickHandler(event){

    let id = this.getAttribute('data-id');
    console.log(id);
    localStorage.setItem('active-movie', id);
    location.replace("./movie.html")
}

// Adding listener to tredirect to particular movie page
function addMovieClickListener(){
    var movieItems = document.getElementsByClassName('movie-item');
    for(var i=0;i<movieItems.length;i++){
        movieItems[i].addEventListener('click', clickHandler);
    }
}

displayFavItems(favItems);


