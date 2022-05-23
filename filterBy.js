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
