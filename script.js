'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector("#movies");

const cleaner = () =>{
  CONTAINER.innerHTML="";
}
// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=")}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const fetchMovieCredits = async (movieID) => {
  const url = constructUrl(`movie/${movieID}/credits`);
  //const url = constructUrl(`movie/752623/credits`);
  const res = await fetch(url);
  return res.json();
};

const movieCreditDetails = async (credits) => {
  const creditRes = await fetchMovieCredits(credits);
  //console.log(creditRes.cast[0].name);  Sandra Bullock
  renderCredits(creditRes.cast);
};

const renderCredits = (credits)=>{
  const creditDiv = document.createElement("div");
  credits.map((credit)=>{
    creditDiv.classList = ("col-lg-1 col-md-4 col-sm-6 m-3 p-0 rounded d-flex flex-column actorCard");
    if(credit.profile_path == null){
      creditDiv.innerHTML = `
        <img style="width:185px"class="w-100  rounded-top" src="https://i.pinimg.com/736x/c1/6c/72/c16c7242915b5ee0479c7e530b77fd9b.jpg" ${
          credit.name
    } poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${credit.name}</h5>
      </div>`;
    }else if(credit.profile_path!==null){
      creditDiv.innerHTML = `
        <img class="w-100 rounded-top" src="${PROFILE_BASE_URL + credit.profile_path}" ${
          credit.name
    } poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${credit.name}</h5>
      </div>`;
    }
        creditDiv.addEventListener("click", () => {
        actorDetails(actor);
    });
    CONTAINER.appendChild(creditDiv);
  })
}

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList = ("col-lg-3 col-md-4 col-sm-12 m-3 p-0 rounded d-flex flex-column movieCard")
    movieDiv.innerHTML = `
        <img class="w-100 rounded-top" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-between ">
        <h5 class="text-left mt-1 ml-2">${movie.title.toUpperCase()}</h5>
        <h6 class="vote_average">${movie.vote_average}</h6>
      </div>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};
// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  console.log(movie);
  const credits = fetchMovieCredits(movie.id);
  CONTAINER.innerHTML = `
    <div class="d-flex flex-row">
        <div class="col-6">
             <img class="w-75" id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="d-flex flex-column col-6 text-left">
            <h3 id="movie-title">${movie.title}</h3>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h4>Overview:</h4>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h4 class="">Actors</h4>
            <ul id="actors" class="list-unstyled">
             
            </ul>
    </div>`;
};
document.addEventListener("DOMContentLoaded", autorun);

// actorList loading part starts here -selin
const actorList= async()=>{
  const actors = await fetchActors();
  renderActors(actors.results);
}

 const fetchActors= async () => {
   const url = constructUrl(`person/popular/`);
   const res = await fetch(url);
   return res.json();
} 
const renderActors = (actors) =>{
  cleaner();  
  actors.map((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.classList = ("col-lg-1 col-md-4 col-sm-6 m-3 p-0 rounded d-flex flex-column actorCard");
    if(actor.profile_path == null){
      actorDiv.innerHTML = `
        <img style="width:185px"class="w-100  rounded-top" src="https://i.pinimg.com/736x/c1/6c/72/c16c7242915b5ee0479c7e530b77fd9b.jpg" ${
          actor.name
    } poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${actor.name}</h5>
      </div>`;
    }else if(actor.profile_path!==null){
      actorDiv.innerHTML = `
        <img class="w-100 rounded-top" src="${PROFILE_BASE_URL + actor.profile_path}" ${
          actor.name
    } poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${actor.name}</h5>
      </div>`;
    }
        actorDiv.addEventListener("click", () => {
        actorDetails(actor);
    });
    CONTAINER.appendChild(actorDiv);
  });
}
const actorDetails= async()=>{
  // const movieRes = await fetchMovie(movie.id);
  // renderMovie(movieRes);
}
//actorList page ends here. 

const renderActor=()=>{
  cleaner();

}
