import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./features/movieSlice";
import userSlice from "./features/userSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice
    }
});