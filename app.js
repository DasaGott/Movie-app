const api_url = `https://api.themoviedb.org/3/movie/popular?&api_key=487b92ab203942469fb2a6052ce57644&page=1`;
const img_path = `https://image.tmdb.org/t/p/w1280`;
const search_api = `https://api.themoviedb.org/3/search/movie?&api_key=487b92ab203942469fb2a6052ce57644&query="`;

const searchForm =
  document.getElementById("form");
const search = document.getElementById("search");

get_movies(api_url);
async function get_movies(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.results);
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
