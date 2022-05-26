const inputBar = document.getElementById("inputBar");

document.getElementById("form").addEventListener("submit", async(e)=>{
    e.preventDefault();
    const movies = await fetchSearchedMovies(inputBar.value);
    renderMovies(movies.results);
});

const constructSearchUrl = (inputValue) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${atob(
        "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
      )}&language=en-US&query=${inputValue}&page=1&include_adult=false&sort_by=popularity`;
  };
  
const fetchSearchedMovies = async (inputValue) => {
    const url = constructSearchUrl(inputValue);
    const res = await fetch(url);
    return res.json();
  };