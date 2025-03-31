import React, { useState } from 'react'
import { createPost } from '../redux/features/auth/post/postSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState(null) 
  const [price, setPrice] = useState('')
  const [mileage, setMileage] = useState('')
  const [transmission, setTransmission] = useState('automatic')
  const [engine, setEngine] = useState('')
  const [fuel, setFuel] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async () => {
    if (!title || !text) {
      alert('Title and content are required')
      return
    }
  
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('price', price ? parseFloat(price) : 0)
      data.append('mileage', mileage ? parseFloat(mileage) : 0)
      data.append('transmission', transmission)
      data.append('engine', engine)
      data.append('fuel', fuel)
  
      if (image) {
        data.append('image', image)
      }
  
      await dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.error('Помилка при створенні поста:', error)
    }
  }
  

  const clearFormHandler = () => {
    setText('')
    setTitle('')
    setPrice('')
    setMileage('')
    setTransmission('automatic')
    setEngine('')
    setFuel('')
    setImage(null) // Додаємо очистку для image
  }

  return (
    <form 
      className='w-1/3 mx-auto py-10'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение:
        <input 
          type="file"  
          className='hidden' 
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className='flex object-cover py-2'>
        {image &&(
          <img src={URL.createObjectURL(image)} alt={image.name} />
        )}
      </div>

      <label className="text-xs text-white opacity-70">
        Заголовок поста:
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Заголовок"
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' 
        />
      </label>

      <label className='text-xs text-white opacity-70'>
        Пробіг:
        <input   
          type='number'
          value={mileage}
          onChange={e => setMileage(e.target.value)}
          placeholder='Пробіг'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-white opacity-70'>
        Коробка передач:
        <select 
          value={transmission} 
          onChange={e => setTransmission(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none'
        >
          <option value="automatic">Автомат</option>
          <option value="manual">Механіка</option>
        </select>
      </label>

      <label className='text-xs text-white opacity-70'>
        Об'єм палива:
        <select 
          value={fuel}
          onChange={e => setFuel(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none'
        >
          <option value="gasoline">Бензин</option>
          <option value="diesel">Дизель</option>
          <option value="gaz">Газ/Бензин</option>
        </select>
      </label>

      <label className='text-xs text-white opacity-70'>
        Ціна:
        <input 
          type="number"
          value={price} 
          onChange={e => setPrice(e.target.value)}
          placeholder='Ціна'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Текст поста:
        <textarea
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Текст поста"
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700' 
        />
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button 
          onClick={submitHandler} 
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
        >
          Добавить
        </button>

        <button
          onClick={clearFormHandler}
          className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
        >
          Отменить
        </button>
      </div>
    </form>
  )
}
