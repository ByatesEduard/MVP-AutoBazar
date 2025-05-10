import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPostDetails = () => {
  const navigate = useNavigate();
  const [engine, setEngine] = useState('');
  const [drive, setDrive] = useState('');
  const [transmission, setTransmission] = useState('');
  const [numberPlate, setNumberPlate] = useState('');

  const handleSubmit = async () => {
    try {
      const fullData = {
        engine,
        drive,
        transmission,
        numberPlate,
      };
  
      
      console.log(fullData); 
  
      // Наприклад, перехід назад після збереження
      navigate('/');
    } catch (error) {
      console.error("Помилка при додаванні деталей:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Додаткові дані</h2>

      <input placeholder="Двигун" value={engine} onChange={(e) => setEngine(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Коробка передач" value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Привід" value={drive} onChange={(e) => setDrive(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Номерний знак" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} className="w-full border p-2 rounded" />

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
        >
          Додати
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-md"
        >
          Скасувати
        </button>
      </div>
    </div>
  );
};

export default AddPostDetails;
