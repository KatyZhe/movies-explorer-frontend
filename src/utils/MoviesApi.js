export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

class MoviesApi {
  constructor(movieUrl) {
    this._movieUrl = movieUrl;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._movieUrl).then((res) => this._parseResponse(res));
  }
}

const moviesApi = new MoviesApi(MOVIES_URL);

export default moviesApi;
