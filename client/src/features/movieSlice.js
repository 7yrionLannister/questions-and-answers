import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        value: []
    },
    reducers: {
        load: (state, action) => {
            state.movies = action.payload;
        }
    }
});

export const {load} = movieSlice.actions;
export const selectMovies = (state) => state.movies.movies;
export default movieSlice.reducer;