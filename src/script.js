// To handle the click on the movie items & to redirect to sepcific movie page.
var movieItems = document.getElementsByClassName('movie-item');

localStorage.setItem('active-movie', undefined);
document.getElementById("search-result-container").style.display = "none";


// To redirect to particular movie page
function clickHandler(event){

    let id = this.getAttribute('data-id');
    console.log(id);
    localStorage.setItem('active-movie', id);
    location.replace("./movie.html")
}


// Adding to favourites when that button is clicked
function favouriteHandler(event){

    let id = this.getAttribute('data-id');
    document.getElementById(id).innerHTML = "Added To Favourites";
    document.getElementById(id).disabled = true;
    document.getElementById(id).style.backgroundColor = 'grey';
    console.log(id);
    let favItems;
    if(localStorage.getItem('fav-items')){
        favItems = localStorage.getItem('fav-items')+','+id;
        // favItems.push(id);
    }
    else{
        favItems = id;
    }
    localStorage.setItem('fav-items', favItems);
    console.log(localStorage.getItem('fav-items'));
}


// Adding listener for the movie items once it is clicked
function addMovieClickListener(){
    var movieItems = document.getElementsByClassName('movie-item');
    for(var i=0;i<movieItems.length;i++){
        movieItems[i].addEventListener('click', clickHandler);
    }
}

// Adding listener for the Add Favourite button items once it is clicked
function addFavClickListener(){
    var favItems = document.getElementsByClassName('fav-btn');
    for(var i=0;i<favItems.length;i++){
        favItems[i].addEventListener('click', favouriteHandler);
    }
}
addMovieClickListener();


// To handle the search keypress and display the results accordingly
var searchArea = document.getElementById('search-area');


// Getting all the results for that text entered in Search bar
async function getSearchResult(text){
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=25d899ea&s=${text}`);
        const data = await response.json()
        // console.log(data);
        return data;
        // renderUsingDOM(data);
    }
    catch(error){
        console.log(error);
        return undefined;
    }
}

// Generating a list of all movies from search results
function getHTMLContent(data){

    console.log(data)
    if(data && data.Response=='True'){
        let htmlData = '', result = data.Search;
        let searchHeading = document.getElementById('search-header');
        // console.log(`Search results found for <b> ${searchArea.value} </b> is ${result.length}`)
        searchHeading.innerHTML = `Search results found for <strong><i> ${searchArea.value} </i><strong> is ${result.length}`;
        for(let i=0;i<result.length;i++){
            htmlData += (`<li class="list-group-item">
                            <span class="movie-item movie-title" data-id=${result[i].imdbID}> 
                                <i class="fa-duotone fa-video fa-fade"></i>
                                ${result[i].Title} 
                            </span>
                            <button class="fav-btn btn btn-info" data-id=${result[i].imdbID} id="${result[i].imdbID}">Add to Favourites</button>
                        </li>`);
        }
        return htmlData;
    }
    else{
        let searchHeading = document.getElementById('search-header');
        searchHeading.innerHTML = `No results found for <strong><i> ${searchArea.value} </i><strong>`;
        return '';
    }
    
}

// To handle search and get the text from search bar
function handleSearch(){

    var searchResults = document.getElementById('search-result');
    let text = searchArea.value;
    console.log(text);
    if(text && text.trim() && text.length > 2){
        
        document.getElementById("home-section").style.display = "none";
        document.getElementById("search-result-container").style.display = "block";
        getSearchResult(text)
            .then(getHTMLContent)
            .then(function(htmlContent){
                searchResults.innerHTML = htmlContent;
                
                addFavClickListener();
                addMovieClickListener();
            });
        
    }
}

searchArea.addEventListener('keypress', handleSearch);
