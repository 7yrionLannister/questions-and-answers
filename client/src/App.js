import Home from "./pages/Home";
import React, { useEffect } from 'react';
import { login, selectUser } from "./features/userSlice";
import { load, selectMovies } from './features/movieSlice';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid
          })
        );
      }
    });
  }, [dispatch]);

  const movies = useSelector(selectMovies);
  useEffect(() => {
      async function asyncFunc() {
          let baseUrl = 'https://api.themoviedb.org/3/movie/';
          let m = [
              await (await fetch(`${baseUrl}500?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)).json(),
              await (await fetch(`${baseUrl}501?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)).json(),
              await (await fetch(`${baseUrl}502?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)).json()
          ];
          dispatch(
              load({
                  movies: m
              })
          );
      }
      asyncFunc();
  }, [dispatch]);

  return (
    user ? <Home items={movies?.movies} /> : <Login />
  );
}

export default App;
