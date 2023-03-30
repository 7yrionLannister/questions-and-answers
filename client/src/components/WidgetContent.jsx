import React, { useEffect } from 'react';
import { load, selectMovies } from '../features/movieSlice';
import { useDispatch, useSelector } from "react-redux";

const WidgetContent = () => {
    const movies = useSelector(selectMovies);
    const dispatch = useDispatch();
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
        <div className="flex flex-col cursor-pointer">
            {movies?.movies.map(item => (
                <div key={item.original_title} className="widgetContent">
                    <img className="w-11 h-11 rounded-full" src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />
                    <div className="ml-3">
                        <h5 className="text-gray-800 text-semibold">{item.original_title}</h5>
                        <p className="text-gray-400 text-sm">{item.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WidgetContent;