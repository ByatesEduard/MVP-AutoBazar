import React, { useState, useEffect, useCallback } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useParams, useNavigate, } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3002/api'

export const PostPage = () => {

  const fuelMap = {
    gasoline: 'Бензин',
    diesel: 'Дизель',
    'gaz/gasoline': 'Газ/Бензин',
    electro: 'Електро',
  };


  const [post, setPost] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`)
      setPost(data)
    } catch (error) {
      console.error('Ошибка загрузки поста:', error)
    }
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (!post) {
    return <div className='text-xl text-center text-black py-10'>Постов не существует</div>
  }

  const formattedDate = post.createdAt
    ? format(new Date(post.createdAt), 'dd MMMM yyyy', { locale: ru })
    : 'Нет даты'

  return (
    <div>
      <button onClick={() => navigate('/sell')} className='flex justify-center items-center bg-red-600 text-s text-black rounded-sm py-2 px-4'>
        Назад
      </button>
      <div className='flex gap-10 py-8 m-4 '>
        <div className='w-2/3'>
          <div className='flex flex-col basis-1/4 flex-grow'>
            <div className={post.imgUrl ? 'flex rounded-sm ' : 'flex rounded-sm'}>
              {post.imgUrl ? (
                <img
                  src={`http://localhost:3002${post.imgUrl.startsWith('/') ? '' : '/'}${post.imgUrl}`}
                  alt='img'
                  className='object-cover w-full h-full'
                />
              ) : (
                <div className='text-black text-center w-full'>Нет изображения</div>
              )}
            </div>
            <div className=''>
            <div className='flex justify-between items-center pt-2'>
              <div className='text-s text-black opacity-50'>{post.username || 'Аноним'}</div>
              <div className='text-xs text-black opacity-50'>{formattedDate}</div>
            </div>
            <div className='text-black text-2xl'>{post.title || 'Без заголовка'}</div>
            <div className='text-black text-2xl flex'>{post.model}</div>
            <div className='text-black text-s pt-2 font-bold '>{post.mileage} км.пробігу</div>
            <div className='flex gap-2 pt-2'>
            <div className='text-black text-s pt-2 font-bold'>{fuelMap[post.fuel]},</div>
            <div className='text-black text-s pt-2 font-bold'>{post.engine}л</div>
            </div>
            <div className=' text-green-700 opacity-70 text-2xl pt-4 font-bold uppercase'>${post.price || 'Обмін'}</div>
            <p className='text-black opacity-60 text-s pt-4'>{post.text || 'Нет описания'}</p>

            <div className='flex gap-3 items-center mt-2'>
              <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                <AiFillEye /> <span>{post.views || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
