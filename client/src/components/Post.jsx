import React, { useState } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/joy';
import {
    Close,
    ArrowUpwardOutlined,
    ArrowDownwardOutlined,
    RepeatOneOutlined,
    ChatBubbleOutline,
    ShareOutlined,
    MoreHorizOutlined
} from '@mui/icons-material';
import LastSeen from 'react-time-ago';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';

import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Post = (props) => {
    const user = useSelector(selectUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answer, setAnswer] = useState('');
    const [showAnswers, setShowAnswers] = useState(false);
    let post = props.post;

    const handleAnswer = async () => {
        if (post?._id && answer !== '') {
            const config = {
                headers: {
                    'Contet-Type': 'application/json'
                }
            };
            const body = {
                answer,
                questionId: post?._id,
                user
            };
            await axios
                .post('/api/answers', body, config)
                .then((res) => {
                    console.log(res.data);
                    alert('Answer added successfully');
                    setIsModalOpen(false);
                    window.location.href = '/';
                })
                .catch((e) => {
                    alert('Error submitting answer');
                });
        }
    };

    const handleQuill = (value) => {
        setAnswer(value);
    };

    const handleShowAnswers = () => {
        setShowAnswers((curr) => !curr);
    };

    return (
        <div>
            <div className='flex items-center'>
                <Avatar />
                <h4 className='ml-2 cursor-pointer text-xs hover:underline'>
                    {post?.user?.username}
                </h4>
                <small className='ml-2'>
                    <LastSeen date={post?.createdAt} />
                </small>
            </div>
            <div className='flex flex-col'>
                <div className='m-2 font-bold cursor-pointer flex items-center flex-1'>
                    <p className='hover:underline'>{post?.category}</p>
                    <button
                        className='ml-auto cursor-pointer p-2 bg-orange-300 outline-none border-none font-light text-sm rounded-md hover:bg-orange-500 transition-all duration-300 ease-in-out'
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        Answer
                    </button>
                    <Modal
                        open={isModalOpen}
                        closeIcon={<Close />}
                        onClose={() => setIsModalOpen(false)}
                        closeOnEsc
                        center
                        closeOnOverlayClick={false}
                        styles={{
                            overlay: {
                                heigth: 'auto'
                            }
                        }}
                    >
                        <div className='flex flex-col items-center mt-5'>
                            <h1 className='text-gray-800 font-semibold mb-2'>
                                {post?.category}
                            </h1>
                            <p className='text-gray-500 text-sm'>
                                asked by <span>{post?.user?.username}</span>
                                on{' '}
                                <span className='text-black font-bold'>
                                    {new Date(post?.createdAt).toLocaleString()}
                                </span>
                            </p>
                        </div>
                        <div className='flex pt-5 flex-1'>
                            <ReactQuill
                                value={answer}
                                onChange={handleQuill}
                                placeHolder='Enter your answer'
                            />
                        </div>
                        <div className='flex items-center justify-between mt-12 w-full'>
                            <button
                                className='border-none mt-2 outline-none text-gray-500 font-medium rounded-3xl cursor-pointer'
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className='border-none outline-none mt-1 bg-orange-400 p-1 text-white font-bold cursor-pointer rounded-xl'
                                type='submit'
                                onClick={handleAnswer}
                            >
                                Add Answer
                            </button>
                        </div>
                    </Modal>
                </div>
                {post.imageUrl !== '' && (
                    <img
                        className='w-full max-h-[400px] object-contain bg-transparent rounded-md cursor-pointer mt-2'
                        src={post.imageUrl}
                    />
                )}
                <p className='text-gray-400 text-medium'>{post?.description}</p>
            </div>
            <div className='flex flex-col items-center mt-1'>
                <div className='bg-gray-100 w-full mt-1 py-1 px-2 flex items-center justify-between rounded-3xl'>
                    <ArrowUpwardOutlined className='text-orange-300 cursor-pointer mr-[40px]' />
                    <ArrowDownwardOutlined className='text-orange-300 cursor-pointer mr-[40px]' />
                    <RepeatOneOutlined className='text-orange-300 cursor-pointer mr-[30px]' />
                    <ChatBubbleOutline className='text-orange-300 cursor-pointer mr-[30px]' />
                    <ShareOutlined className='text-orange-300 cursor-pointer mr-[30px]' />
                    <MoreHorizOutlined className='text-orange-300 cursor-pointer mr-[30px]' />
                </div>
                <button
                    onClick={handleShowAnswers}
                    className='text-black/50 text-sm font-bold mx-2'
                >
                    {post?.allAnswers.length} Answer(s)
                </button>
                {showAnswers && (
                    <div className='mt-1 w-full pt-1 pl-1 border-t-2 border-t-solid border-t-gray-100'>
                        {post?.allAnswers?.slice(0, 5).map((_a) => (
                            <>
                                <div className='flex flex-col border-t-2 border-t-solid border-t-gray-100'>
                                    <div className='flex items-center mb-2 text-sm font-semibold text-gray-800'>
                                        <Avatar />
                                        <div className='ml-1 my-2'>
                                            <p>{_a?.user?.username}</p>
                                            <span>
                                                <LastSeen
                                                    date={_a?.createdAt}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                _a?.answer
                                            )
                                        }}
                                    ></div>
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
