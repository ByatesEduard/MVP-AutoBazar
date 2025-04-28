import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export const PostItem = ({ post }) => {
    const fuelMap = {
        gasoline: 'Бензин',
        diesel: 'Дизель',
        'gaz/gasoline': 'Газ/Бензин',
        electro: 'Електро',
    };

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Постов не существует
            </div>
        );
    }

    const formattedDate = post?.createdAt
        ? format(new Date(post.createdAt), "d MMM yy", { locale: ru })
        : '';

    return (
        <Link className='flex' to={`/post/${post._id}`}>
            <div className=' mt-12 transition-transform duration-300 hover:scale-110 border border-neutral-600 p-4 rounded-lg'>
                <div className='flex flex-col basis-1/4 flex-grow'>
                    <div className={post?.imgUrl ? 'flex rounded-sm ' : 'flex rounded-sm'}>
                        {post?.imgUrl && (
                            <img
                                src={`http://localhost:3002/${post.imgUrl}`}
                                alt="img"
                                className='object-cover w-full'
                            />
                        )}
                    </div>
                    <div className='flex justify-between items-center pt-2 '>
                        <div className='text-s text-black opacity-50 text-bold'>{post.username}</div>
                        <div className='text-xs text-black opacity-50'>{formattedDate}</div>
                    </div>
                    <div className='text-black text-xl'>{post.title}</div>
                    <div className='text-black text-xl'>{post.model}</div>
                    <div className="bg-white border border-black rounded inline-flex items-center font-semibold text-blue-900 text-lg w-fit">
                        <div className="flex items-center">
                            <div className="flex flex-col items-center justify-center bg-blue-600 text-white px-1 py-0.5 rounded-l-sm mr-1 w-5 h-5">
                                <div className="text-[8px] font-bold">UA</div>
                                <div className="w-full h-0.5 bg-yellow-400"></div>
                            </div>
                            <span className="text-xs font-bold px-1 text-black">
                                {post.numberPlate || 'Номерний знак не вказано'}
                            </span>
                        </div>
                    </div>
                    <div className='text-black text-s pt-2 font-bold '>{post.mileage} км.пробігу</div>
                    <div className='flex gap-2 pt-2'>
                        <div className='text-black text-s pt-2 font-bold'>{fuelMap[post.fuel]},</div>
                        <div className='text-black text-s pt-2 font-bold'>{post.engine}.л</div>
                    </div>
                    <p className='text-green-900 opacity-70 text-2xl pt-2 font-bold'>${post.price}</p>
                    <p className='text-black opacity-60 text-xs pt-4'>{post.text}</p>

                    <div className='flex gap-3 items-center mt-2'>
                        <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                            <AiFillEye /> <span>{post.views}</span>
                        </button>
                        <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                            <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                        </button>
                    </div>
                </div>
            </div>
            
        </Link>
    );
};