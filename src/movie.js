
var activeId = localStorage.getItem('active-movie');
console.log(activeId);

var movieItem = document.getElementById('movie-item');


// Fetch the particular movie details using IMDB ID
async function fetchMovie(id){
        
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=25d899ea&i=${id}`);
        const data = await response.json()
        console.log(data);
        renderUsingDOM(data);
    }
    catch(error){
        console.log(error);
    }
}

// Generating HTML content for the Movie page with movie details
function renderUsingDOM(data){

    movieItem.innerHTML = ` 
                <div class="card mb-3 card-container" style="max-width: 740px;">
                    <div class="row g-0">
                        <div class="col-7">
                        <img src="${data.Poster}" class="rounded-start" width="400" alt="...">
                        </div>
                        <div class="col">
                            <div class="card-body">
                                <h3 class="card-title">${data.Title}</h3>
                                <p class="card-text">${data.Plot}</p>
                                <p class="card-text"><b>Director: </b>${data.Director}</p>
                                <p class="card-text"><b>Writer: </b>${data.Writer}</p>
                                <p class="card-text"><b>Actors: </b>${data.Actors}</p>
                                <p class="card-text"><b>Genre: </b>${data.Genre}</p>
                                <p class="card-text"><b>Awards: </b>${data.Awards}</p>
                                <p class="card-text"><b>BoxOffice: </b>${data.BoxOffice}</p>
                                <p class="card-text"><b>Country: </b>${data.Country}</p>
                                <p class="card-text"><b>Rated: </b>${data.Rated}</p>
                                <p class="card-text"><b>Rating: </b>${data.imdbRating}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    `;
}


fetchMovie(activeId);