import Home from './pages/Home';
import React, { useEffect } from 'react';
import { login, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import { auth } from './firebase';
import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

function App() {
    TimeAgo.addDefaultLocale(en);
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

    return user ? <Home /> : <Login />;
}

export default App;
