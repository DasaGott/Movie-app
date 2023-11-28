const api_url = `https://api.themoviedb.org/3/movie/popular?&api_key=487b92ab203942469fb2a6052ce57644`;
const img_path = `https://image.tmdb.org/t/p/w500`;
const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=487b92ab203942469fb2a6052ce57644&query="`;

const searchForm =
  document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("main");

get_movies(api_url);
async function get_movies(url) {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const {
      vote_average,
      overview,
      title,
      poster_path,
    } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `<img
          src="${img_path + poster_path}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${getClassByRating(
            vote_average
          )}>${(
      Math.round(vote_average * 100) / 100
    ).toFixed(1)}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`;

    main.appendChild(movieEl);
  });
}

function getClassByRating(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchSpace = search.value;

  if (searchSpace && searchSpace !== "") {
    get_movies(search_api + searchSpace);

    search.value = "";
  } else {
    window.location.reload();
  }
});
