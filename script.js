"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector("#movies");
const TOPFIVEACTORS = document.querySelector("#topFiveActors");
const SINGLEMOVCONT = document.querySelector("#singleMovie");
let photoDiv = document.getElementById("bgdiv");

const cleaner = () => {
  CONTAINER.innerHTML = "";
  SINGLEMOVCONT.innerHTML = "";
  TOPFIVEACTORS.innerHTML = "";
  photoDiv.innerHTML = "";
};
// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
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

const fetchMovieCredits = async (movieId) => {
  try {
    const url = constructUrl(`movie/${movieId}/credits`);
    const res = await fetch(url);
    const cast = await res.json();
    return cast;
  } catch (error) {
    console.log(error);
  }
};
const fetchMovieRecommendations = async (movieId) => {
  try {
    const url = constructUrl(`movie/${movieId}/recommendations`);
    const res = await fetch(url);
    const recommendations = await res.json();
    return recommendations;
  } catch (error) {
    console.log(error);
  }
};
const fetchActors = async () => {
  const url = constructUrl(`person/popular/`);
  const res = await fetch(url);
  return res.json();
};

const fetchActor = async (actorId) => {
  const url = constructUrl(`person/${actorId}`);
  const res = await fetch(url);
  const actorInfo = await res.json();
  return actorInfo;
};

const fetchActorCredits = async (actorId) => {
  const url = constructUrl(`person/${actorId}/movie_credits`);
  const res = await fetch(url);
  const castCredits = await res.json();
  return castCredits;
};

const fetchMovieTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  const trailer = await res.json();
  return trailer;
};

const movieCreditDetails = async (credits) => {
  const creditRes = await fetchMovieCredits(credits);
  renderCredits(creditRes.cast);
};

const renderCredits = (credits) => {
  cleaner();
  const creditDiv = document.createElement("div");
  credits.map((credit) => {
    creditDiv.classList =
      "col-lg-1 col-md-4 col-sm-6 m-3 p-0 rounded d-flex flex-column actorCard";
    if (credit.profile_path == null) {
      creditDiv.innerHTML = `
        <img style="width:185px"class="w-100  rounded-top" src="https://i.pinimg.com/736x/c1/6c/72/c16c7242915b5ee0479c7e530b77fd9b.jpg" ${credit.name} poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${credit.name}</h5>
      </div>`;
    } else if (credit.profile_path !== null) {
      creditDiv.innerHTML = `
        <img class="w-100 rounded-top" src="${
          PROFILE_BASE_URL + credit.profile_path
        }" ${credit.name} poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${credit.name}</h5>
      </div>`;
    }
    creditDiv.addEventListener("click", () => {
      actorDetails(actor);
    });
    CONTAINER.appendChild(creditDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  cleaner();
  movies.map((movie) => {
    //console.log(movie);
    const movieDiv = document.createElement("div");
    movieDiv.classList =
      "col-lg-3 col-md-5 col-sm-10 m-3 p-0 rounded d-flex flex-column movieCard";
      movieDiv.innerHTML = `
        <img class="w-100 rounded-top" src="${movie.backdrop_path !== null ? BACKDROP_BASE_URL + movie.backdrop_path : "/images/movie-null.jpg"}"
          alt="${movie.title} poster">
        <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-between ">
          <h5 class="text-left mt-1 ml-2">${movie.title.toUpperCase()}</h5>
          <h6 class="vote_average">${movie.vote_average}</h6>
        </div>
        <div id="overview">
          <p class="text-left mt-2 ml-2">${movie.overview}</p>
        </div>`;
    //}
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

const renderMovie = async (movie) => {
  cleaner();
  Promise.all([
    fetchMovieCredits(movie.id),
    fetchMovieRecommendations(movie.id),
    fetchMovieTrailer(movie.id),
  ]).then((credits) => {
    let photoDiv = document.getElementById("bgdiv");
    photoDiv.innerHTML = `<img id="movie-backdropp" src=${
      movie.backdrop_path !== null
        ? BACKDROP_BASE_URL + movie.backdrop_path
        : "/images/movie-null.jpg"
    } style="
    position:absolute;
    z-index:-999;
    width:190vw;
    height:150vh;
    transform:translateX(-20%);
    filter:blur(8px) brightness(0.4);
    ">`;
    CONTAINER.innerHTML = `
    <h1 class="p-4" id="movie-title">${movie.title.toUpperCase()}</h1>
    <div class="d-flex flex-row text-left p-2 m-3">
        <div id="renderMovieFirst" class="col-6 m-3">
            <h4>Overview:</h4>
            <p id="movie-overview">${movie.overview}</p>
            <h4 class="">Details: </h4>
          <p id="movie-release-date"><b>Release Date:</b> ${
            movie.release_date
          }</p>
          <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
          <p id="movie-language"><b>Language:</b> ${
            movie.original_language == "en"
              ? "English"
              : movie.original_language == "es"
              ? "Spanish"
              : movie.original_language == "fr"
              ? "French"
              : movie.original_language == "it"
              ? "Italian"
              : movie.original_language == "de"
              ? "German"
              : movie.original_language == "pt"
              ? "Portuguese"
              : movie.original_language == "ru"
              ? "Russian"
              : movie.original_language == "ja"
              ? "Japanese"
              : movie.original_language == "ko"
              ? "Korean"
              : movie.original_language == "zh"
              ? "Chinese"
              : movie.original_language == "ar"
              ? "Arabic"
              : movie.original_language == "tr"
              ? "Turkish"
              : movie.original_language == "pl"
              ? "Polish"
              : movie.original_language == "nl"
              ? "Dutch"
              : movie.original_language == "sv"
              ? "Swedish"
              : movie.original_language == "no"
              ? "Norwegian"
              : movie.original_language == "fi"
              ? "Finnish"
              : movie.original_language == "da"
              ? "Danish"
              : movie.original_language == "cs"
              ? "Czech"
              : movie.original_language == "hu"
              ? "Hungarian"
              : movie.original_language == "el"
              ? "Greek"
              : movie.original_language == "he"
              ? "Hebrew"
              : movie.original_language == "hi"
              ? "Hindi"
              : movie.original_language == "id"
              ? "Indonesian"
              : movie.original_language == "ms"
              ? "Malay"
              : movie.original_language == "no"
              ? "Norwegian"
              : movie.original_language == "fa"
              ? "Persian"
              : movie.original_language == "ro"
              ? "Romanian"
              : "Unknown"
          }</p>
          <p id="movie-director"><b>Director:</b> ${
            credits[0].crew.find((crew) => crew.job === "Director").name
          }</p>
            <p id="production-companies"><b>Production Companies:</b> ${movie.production_companies
              .map((company) => company.name)
              .join(", ")}</p>
            <p id="ratings"><b>Ratings:</b> ${movie.vote_average}/10 in ${
      movie.vote_count
    } votes.</p>
        </div>
        

         ${credits[0].cast
           .slice(0, 5)
           .map((actor) => {
             const actorDiv = document.createElement("div");
             actorDiv.classList =
               "col-lg-1 col-md-2 col-sm-4 m-4 p-0 rounded d-flex flex-column actorCard";
             if (actor.profile_path == null) {
               actorDiv.innerHTML = `
               <img style="width:185px"class="w-100  rounded-top" src="/images/actor-null.jpg" ${actor.name} poster">
             <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center text-center">
               <h5>${actor.name}</h5>
               <h6>${actor.character}</h6>
             </div>`;
             } else if (actor.profile_path !== null) {
               actorDiv.innerHTML = `
               <img class="w-100 rounded-top" src="${
                 PROFILE_BASE_URL + actor.profile_path
               }" ${actor.name} poster">
             <div class="h-100 m-0 p-2 row d-flex align-items-center justify-content-center text-center">
               <h5>${actor.name}</h5>  as <h6 class="text-primary">${
                 actor.character
               }</h6>
             </div>`;
             }
             actorDiv.addEventListener("click", () => {
               actorDetails(actor.id);
             });
             TOPFIVEACTORS.appendChild(actorDiv);
           })
           .join(" ")}
       
           
          <ul id="recommendations" class="list-unstyled">
            ${credits[1].results
              .slice(0, 3)
              .map((movie) => {
                const movieDiv = document.createElement("div");
                movieDiv.classList =
                  "col-lg-3 col-md-4 col-sm-12 m-2 p-0 rounded d-flex flex-column movieCard";
                movieDiv.innerHTML = `
                    <img class="w-100 rounded-top" src="${
                      BACKDROP_BASE_URL + movie.backdrop_path
                    }" alt="${movie.title} poster">
                  <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-between ">
                    <h5 class="text-left mt-1 ml-2">${movie.title.toUpperCase()}</h5>
                  </div>`;
                movieDiv.addEventListener("click", () => {
                  movieDetails(movie);
                });
                SINGLEMOVCONT.appendChild(movieDiv);
              })
              .join("")}
          </ul>
    
        <section class="col-6 p-3 text-left d-flex justify-content-center">
          <iframe class="" style="width:552px; height:311px; margin:auto" src="https://www.youtube.com/embed/${
            credits[2].results.find(
              (x) => x.name === "Official Trailer" || x.name === "Trailer"
            ).key
          }"allowfullscreen> </iframe>
        </section>
    </div>`;
  });
};

// actorList loading part starts here -selin
const actorList = async () => {
  const actors = await fetchActors();
  renderActors(actors.results);
};

const renderActors = (actors) => {
  cleaner();
  actors.map((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.classList =
      "col-lg-1 col-md-4 col-sm-6 m-3 p-0 rounded d-flex flex-column actorCard";
    if (actor.profile_path == null) {
      actorDiv.innerHTML = `
        <img style="width:185px"class="w-100  rounded-top" src="/images/actor-null.jpg" ${actor.name} poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${actor.name}</h5>
      </div>`;
    } else if (actor.profile_path !== null) {
      actorDiv.innerHTML = `
        <img class="w-100 rounded-top" src="${
          PROFILE_BASE_URL + actor.profile_path
        }" ${actor.name} poster">
      <div class="h-100 m-0 p-2 d-flex align-items-center justify-content-center">
        <h5>${actor.name}</h5>
      </div>`;
    }
    actorDiv.addEventListener("click", () => {
      actorDetails(actor.id);
    });
    CONTAINER.appendChild(actorDiv);
  });
};
const actorDetails = async (actorId) => {
  const actor = await fetchActor(actorId);
  renderActor(actor);
};

const renderActor = async (actor) => {
  cleaner();
  const castCredits = fetchActorCredits(actor.id).then((filmography) => {
    CONTAINER.innerHTML = `
    <div class="flex-row">
       <div class="row"> 
       <div class="col-4">
       <img class="w-75" id="actor-backdrop" src = ${
         actor.profile_path == null
           ? "/images/actor-null.jpg"
           : PROFILE_BASE_URL + actor.profile_path
       }>
       </div>
       <div class="d-flex flex-column col-8 text-left">
           <h3 id="actor-name">${actor.name}</h3>
           <p id="actor-birthday"><b>Birthday:</b> ${actor.birthday}</p> 
           ${
             actor.deathday !== null
               ? `<p id="actor-deathday"><b>Deathday:</b> ${actor.deathday}</p>`
               : ""
           }
           <p id="actor-popularity"><b>Popularity:</b> ${actor.popularity}</p>
           <p id="actor-gender"><b>Gender(is a social construct):</b> ${
             actor.gender == 1 ? "Female(?)" : "Male(?)"
           } </p> 
           <h4>Biography:</h4>
           <div class="readMoreCnt">
            <div class="row">
             <div class="span3">
             <div class="inner">
             <div class="inCnt">
             <p id="actor-biography">${actor.biography}</p>

             </div>
             </div>
             <button class="readMore">Read More</button>
             </div>
             </div>
           </div>
           </div>
           </div> 
      
          <div id="actorFilmography">
            <h4>Filmography</h4>
            <ul id="filmography">
            ${filmography.cast
              .map((movie) => {
                return `<li id= ${movie.id} class="movie">${movie.title}</li>`;
              })
              .join(" ")}
              </ul>
          </div>
      </div>`;

    //This is the jQuery part, taken from https://codepen.io/tusharbandal/pen/yLpbdR
    $(".inCnt").each(function () {
      if ($(this).height() <= 145) {
        $(this).parent(".inner").next(".readMore").hide();
      }
    });

    $(".readMore").click(function () {
      var cntHeight = $(this).parent(".span3").find(".inCnt").height();
      if ($(this).hasClass("active")) {
        $(".readMore").removeClass("active").html("Read More");
        $(".inner").animate({
          maxHeight: "145px",
        });
      } else {
        $(".readMore").removeClass("active").html("Read More");
        $(".inner").animate({
          maxHeight: "145px",
        });
        $(this)
          .prev(".inner")
          .animate(
            {
              maxHeight: cntHeight,
            },
            function () {
              $(this).next(".readMore").addClass("active").html("Read Less");
            }
          );
      }
      return false;
    });
  });
};

document.addEventListener("DOMContentLoaded", autorun);
