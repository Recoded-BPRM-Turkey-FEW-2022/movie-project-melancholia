//https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
//<a onClick="filterBy('horror')"

const genreList = {
    horror: 27,
    scifi: 878,
    comedy: 35,
    drama: 18,
};

const genreFilter = async (filterpath) => {
    cleaner();
    const path = genreList[filterpath];
    console.log(path);
  const movies = await genreFilterFetch(path);
  renderMovies(movies.results);
};

const genreFilterFetch = async (path) => {
    const url = genreUrlGenerator(path);
    const res = await fetch(url);
    return res.json();
  };

const genreUrlGenerator = (path) => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=")}&with_genres=${path}`;
};