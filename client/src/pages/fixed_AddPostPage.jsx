import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPostPage = () => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuel, setFuel] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const years = Array.from({ length: 2025 - 1990 + 1 }, (_, i) => (1990 + i).toString());
  const fuels = ['Бензин', 'Дизель', 'Газ', 'Електро', 'Гібрид'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brand || !model || !year || !price || !mileage || !fuel || !description || !image) {
      alert("Будь ласка, заповніть усі поля");
      return;
    }

    if (isNaN(Number(price)) || isNaN(Number(mileage)) || isNaN(Number(year))) {
      alert("Ціна, пробіг та рік мають бути числовими значеннями");
      return;
    }

    const newPost = {
      brand,
      model,
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      fuel,
      description,
      image
    };

    try {
      await axios.post('http://localhost:3000/posts', newPost);
      navigate('/');
    } catch (error) {
      console.error("Помилка при додаванні оголошення:", error);
      alert("Сталася помилка при відправленні даних");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Додати оголошення</h2>

      <input placeholder="Марка" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Модель" value={model} onChange={(e) => setModel(e.target.value)} className="w-full border p-2 rounded" />

      <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full border p-2 rounded">
        <option value="">Рік випуску</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <input type="number" placeholder="Ціна" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" />
      <input type="number" placeholder="Пробіг" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full border p-2 rounded" />

      <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full border p-2 rounded">
        <option value="">Тип пального</option>
        {fuels.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <textarea placeholder="Опис" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" />
      <div className="space-y-4">
  <div className="flex flex-col">
    <input 
      placeholder="URL зображення" 
      value={image} 
      onChange={(e) => setImage(e.target.value)} 
      className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
    />
    <span className="text-xs text-gray-500 mt-1">Введіть URL зображення для попереднього перегляду</span>
  </div>

  <div className="flex flex-col items-center">
    <label 
      className="text-white py-3 px-6 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
      htmlFor="image-upload"
    >
      Прикріпити зображення:
    </label>
    <input 
      id="image-upload"
      type="file"  
      className="hidden" 
      onChange={(e) => setImage(e.target.files[0])}
    />
    {image && (
      <div className="mt-4">
        <img 
          src={URL.createObjectURL(image)} 
          alt="preview" 
          className="w-32 h-32 object-cover rounded-md border-2 border-gray-300" 
        />
      </div>
    )}
  </div>
</div>

      <div className='flex object-cover py-2'>
        {image &&(
          <img src={URL.createObjectURL(image)} alt={image.name} />
        )}
      </div>

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md">
          Додати
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md"
        >
          Скасувати
        </button>
      </div>
    </form>
  );
};

export default AddPostPage;
