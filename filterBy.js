//movie/popular gibi URL construct etsin diye eski fonksiyona
//filterpath ekledim, onclick'te o pathi alip ekleyip URL construct ediyo
//sonra eski fonksiyonumuz olan renderMovies e pasliyor buldugunu

const filterBy = async (filterpath) => {
    cleaner();
    const path = "movie/"+filterpath;
  const movies = await filterByFetch(path);
  renderMovies(movies.results);
};

const filterByFetch = async (filepath) => {
    const url = constructUrl(filepath);
    const res = await fetch(url);
    return res.json();
  };

// regular filters end here and release date filter starts here 
const filterByReleaseDate = async () => {
    cleaner();
  const movies = await filterByReleaseDateFetch();
  renderMovies(movies.results);
};

const filterByReleaseDateFetch = async () => {
    const url = releaseDateUrlGenerator();
    const res = await fetch(url);
    return res.json();
  };

const releaseDateUrlGenerator = () => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=")}&sort_by=release_date.desc`;
};
