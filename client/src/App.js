import Home from './pages/Home';
import React from 'react';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

function App() {
    TimeAgo.addDefaultLocale(en);
    const user = useSelector(selectUser);

    return user ? <Home /> : <Login />;
}

export default App;
