import React from 'react';
import { AssignmentTurnedInOutlined, NotificationsOutlined, FeaturedPlayListOutlined, PeopleAltOutlined, Search, Home, AccountCircle } from '@mui/icons-material'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            signOut(auth).then(() => {
                dispatch(logout());
                alert('Logged out');
            }).catch(err => {
                alert('Error logging out');
            });
        }
    };
    return (
        <div className='flex items-center bg-white sticky z-50 shadow-sm top-0 justify-center p-[3px]'>
            <div className='flex'>
                <span className='text-orange-500 text-lg font-semibold mr-5'>Logo</span>
            </div>
            <div className='flex'>
                <div className='headerIcon'>
                    <Home />
                </div>
                <div className='headerIcon'>
                    <FeaturedPlayListOutlined />
                </div>
                <div className='headerIcon'>
                    <AssignmentTurnedInOutlined />
                </div>
                <div className='headerIcon'>
                    <PeopleAltOutlined />
                </div>
                <div className='headerIcon'>
                    <NotificationsOutlined />
                </div>
            </div>
            <div className='hidden md:flex items-center border-2 rounded-lg border-solid border-gray-300 p-[5px] ml-[5px]'>
                <Search />
                <input type="text" className='bg-transparent outline-none border-none' placeholder='Search...' />
            </div>
            <div>
                <span onClick={handleLogout}>
                    <AccountCircle />
                </span>
                <button className='px-2 py-1 rounded-lg ml-1 bg-orange-300 hover:bg-orange-500'>Add Question</button>
            </div>
        </div>
    )
}

export default Header