import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

const Login = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await axios
            .post(
                '/api/users/login',
                {
                    username,
                    password
                },
                {
                    'Content-Type': 'application/json'
                }
            )
            .then((result) => {
                alert('Login successful');
                const user = result.data;
                dispatch(login(user));
                axios.defaults.headers.common['x-access-token'] = user.token;
            })
            .catch((err) => {
                alert('Error while authenticating');
            });
    };

    return (
        <div className='flex items-center justify-center h-screen w-screen box-border'>
            <div className='flex flex-col items-center'>
                <span className='italic text-xl font-bold m-2 text-black shadow-md'>
                    Login
                </span>
                <input
                    className='bg-gray-200 rounded px-2 my-1'
                    type='text'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='username'
                />
                <input
                    className='bg-gray-200 rounded px-2 my-1'
                    type='password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />
                <button
                    className='bg-[#34ff99] px-2 rounded my-1'
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
