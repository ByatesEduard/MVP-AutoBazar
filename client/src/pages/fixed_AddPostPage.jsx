import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  axios  from 'axios'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState(null) 
  const [price, setPrice] = useState('')
  const [mileage, setMileage] = useState('')
  const [transmission, setTransmission] = useState('automatic')
  const [engine, setEngine] = useState('')
  const [fuel, setFuel] = useState('gasoline')
  const [drive, setDrive] = useState('')
  const [model, setModel] = useState('')
  const [numberPlate, setNumberPlate] = useState('');

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
      data.append('price', price.toString())
      data.append('mileage', mileage.toString())
      data.append('transmission', transmission)
      data.append('engine', engine)
      data.append('fuel', fuel)
      data.append('drive', drive)
      data.append('model', model)
      data.append('numberPlate', numberPlate);
      if (image) data.append('image', image)
  
      console.log('Submitting FormData:', [...data.entries()])
  
      const token = localStorage.getItem('token') // ⬅️ беремо токен
  
      const res = await axios.post('/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // ⬅️ додаємо токен
        },
      })
  
      console.log('Post created:', res.data)
  
      navigate('/sell')
    } catch (error) {
      console.error('Post creation error:', error.response?.data || error.message)
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
    setImage(null)
    setDrive('')
    setModel('')
    setNumberPlate('');
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

      <label className="text-xs text-black opacity-70">
        Марка:
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Заголовок"
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' 
        />
      </label>

      <label className="text-xs text-black opacity-70">
        Модель:
        <input 
          type="model"
          value={model}
          onChange={e => setModel(e.target.value)}
          placeholder="Заголовок"
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' 
        />
      </label>

      <label className="text-xs text-black opacity-70">
         Номерний знак:
         <input
        type="text"
        value={numberPlate}
        onChange={(e) => setNumberPlate(e.target.value)}
        placeholder="Номерний знак"
        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
         />
     </label>     

      <label className='text-xs text-black opacity-70'>
        Пробіг:
        <input   
          type='number'
          value={mileage}
          onChange={e => setMileage(e.target.value)}
          placeholder='Пробіг'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-black opacity-70'>
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

            

      <label className='text-xs text-black opacity-70'>
        Паливо:
        <select 
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none'
          >
            <option value="gasoline">Бензин</option>
            <option value="diesel">Дизель</option>
            <option value="gaz/gasoline">Газ/Бензин</option>
            <option value="electro">Електро</option>
          </select>
      </label>

      <label className='text-xs text-black opacity-70'>
        Привод:
        <select 
         value={drive}
         onChange={e => setDrive(e.target.value)}
         className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none'
         >
            <option value="RWD">RWD</option>
            <option value="FWD">FWD</option>
            <option value="AWD">AWD</option>
         </select>
      </label>

      <label className='text-xs text-black opacity-70'>
        Об'єм двигун:
        <select 
          value={engine}
          onChange={e => setEngine(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none'
        >
          <option value="0.6l">0.6</option>
          <option value="0.9">0.9</option>
          <option value="1.0l">1.0</option>
          <option value="1.2l">1.2</option>
          <option value="1.6l">1.6</option>
          <option value="1.8l">1.8</option>
          <option value="1.9l">1.9</option>
          <option value="2.0l">2.0</option>
          <option value="2.2l">2.2</option>
          <option value="2.4l">2.4</option>
          <option value="2.5l">2.5</option>
          <option value="3.0l">3.0</option>
          <option value="3.3l">3.3</option>
          <option value="3.6l">3.6</option>
          <option value="4.0l">4.0</option>
          <option value="4.4l">4.4</option>
          <option value="4.8l">4.8</option>
          <option value="5.5l">5.5</option>
        </select>
      </label>

      <label className='text-xs text-black opacity-70'>
        Ціна:
        <input 
          type="number"
          value={price} 
          onChange={e => setPrice(e.target.value)}
          placeholder='Ціна'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-s outline-none placeholder:text-gray-700'
        />
      </label>

      <label className="text-xs text-black opacity-70">
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
          className='flex justify-center items-center bg-green-600 text-xs text-black rounded-sm py-2 px-4'
        >
          Добавить
        </button>

        <button
          onClick={clearFormHandler}
          className='flex justify-center items-center bg-red-500 text-xs text-black rounded-sm py-2 px-4'
        >
          Очистить 
        </button>

        
         <button
          onClick={() => navigate('/sell')}
          className=' bg-red-500 text-xs text-black rounded-sm py-2 px-4'
        >
            Отменить <span className='font-bold '>&rarr;</span> 
        </button>
      </div>
    </form>
  )
}
