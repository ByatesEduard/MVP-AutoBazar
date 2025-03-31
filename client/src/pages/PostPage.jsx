import React, { useState, useEffect, useCallback } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useParams, useNavigate, } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3002/api'

export const PostPage = () => {
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
    return <div className='text-xl text-center text-white py-10'>Постов не существует</div>
  }

  const formattedDate = post.createdAt
    ? format(new Date(post.createdAt), 'dd MMMM yyyy', { locale: ru })
    : 'Нет даты'

  return (
    <div>
      <button onClick={() => navigate('/')} className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        Назад
      </button>
      <div className='flex gap-10 py-8'>
        <div className='w-2/3'>
          <div className='flex flex-col basis-1/4 flex-grow'>
            <div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
              {post.imgUrl ? (
                <img
                  src={`http://localhost:3002${post.imgUrl.startsWith('/') ? '' : '/'}${post.imgUrl}`}
                  alt='img'
                  className='object-cover w-full h-full'
                />
              ) : (
                <div className='text-white text-center w-full'>Нет изображения</div>
              )}
            </div>
            <div className='flex justify-between items-center pt-2'>
              <div className='text-xs text-white opacity-50'>{post.username || 'Аноним'}</div>
              <div className='text-xs text-white opacity-50'>{formattedDate}</div>
            </div>
            <div className='text-white text-xl'>{post.title || 'Без заголовка'}</div>
            <p className='text-white opacity-60 text-xs pt-4'>{post.text || 'Нет описания'}</p>

            <div className='flex gap-3 items-center mt-2'>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{post.views || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
