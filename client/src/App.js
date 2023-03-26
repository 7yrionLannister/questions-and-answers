import Home from "./pages/Home";
import React from 'react';

const baseUrl = 'https://api.themoviedb.org/3/movie/';

class App extends React.Component {
  state = {
    movies: []
  }

  getMovies = async () => {
    let movies = [
      await (await fetch(`${baseUrl}500?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)).json(),
      await (await fetch(`${baseUrl}501?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)).json(),
      await (await fetch(`${baseUrl}502?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)).json()
    ]
    this.setState({
      movies: movies
    });
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <Home items={this.state.movies} />
    )
  }
}

export default App;
