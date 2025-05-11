import React, { useState } from 'react';
import image5 from '../img/logo.jpg';
import header from '../img/header.jpg';
import image10 from '../img/18337.avif';
import image11 from '../img/18395.avif';
import { FaPhone, FaMapMarkerAlt, FaClock, FaDirections } from 'react-icons/fa';

const VIYSKOVYI_ZBIR_URL = 'https://send.monobank.ua/jar/9Ud7dzjvrb';

const MainPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  const handleSupportClick = () => {
    window.location.href = VIYSKOVYI_ZBIR_URL;
  };

  const handleSubmit = () => {
  window.location.href = 'http://localhost:3000/api/chat';
  };

  

  const icons = {};
  for (let i = 1; i <= 35; i++) {
    icons[`${i}`] = require(`../icon/${i}.jpg`);
  }

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100, user: 'Користувач' })
      });

      const data = await response.json();
      const paymentWindow = window.open('', '_blank');
      paymentWindow.document.write(data.html);
      paymentWindow.document.close();
    } catch (error) {
      console.error('Помилка при створенні платежу:', error);
      alert('Не вдалося ініціювати оплату');
    }
  };

  const renderCatalog = () => (
    <div className="catalog-container bg-white rounded-lg p-4 shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Ринок вживаних автомобілів</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { brand: 'Toyota', model: 'Camry', year: 2018, price: '$20,000' },
          { brand: 'Honda', model: 'Civic', year: 2019, price: '$18,000' },
          { brand: 'BMW', model: 'X5', year: 2020, price: '$45,000' }
        ].map((car, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
            <p>Рік: {car.year}</p>
            <p>Ціна: {car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white font-sans min-h-screen  p-4">
      <div className="container mx-auto">
        <div className="flex justify-end mb-4">
          <button
            className="bg-green-500 text-white text-lg font-bold px-4 py-2 rounded mr-4"
            onClick={handleSubscribe}
            disabled={isSubscribed}
          >
            {isSubscribed ? 'Підписка активована' : 'Оформити підписку на місяць'}
          </button>
          <button
            className="bg-blue-500 text-white text-lg font-bold px-4 py-2 rounded"
            onClick={handleSupportClick}
          >
            Купити підписку Premium+
          </button>
        </div>

        {showCatalog ? renderCatalog() : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex">
              <div className="w-1/3">
                <img src={header} alt="header" className="rounded mb-4" />
                <img src={image5} alt="Логотип" className="mb-2 w-full" />
              </div>
              <div className="w-2/3 pl-6">
                <h2 className="text-xl font-bold mb-2">Щоб ви купували авто без сюрпризів</h2>
                <p>Ми робимо 32 перевірки: розшук, VIN, пробіг, історія, ДТП тощо.</p>
                <img src={image11} alt="Інфо" className="my-4 w-full" />
                <img src={image10} alt="Інфо" className="w-1/2" />
              </div>
            </div>
          </div>
        )}

        <div className='bg-white p-6 rounded-lg shadow-md mt-10 flex gap-8'>
          <div className='font-bold text-black text-xl'>
            Марки автомобілів:
            <div className='flex flex-wrap gap-2'>
              {Object.keys(icons).map((key) => (
                <img key={key} src={icons[key]} alt={`Icon ${key}`} className="w-25 h-24 object-contain" />
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-gray-800 text-white pt-10 mt-10 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between px-8 pb-6">
            {/* Left info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl" />
                <span>+(380)66-423-9374</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl" />
                <span>проспект Степана Бандери, 24 Д, Київ, Украина, 04073</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-xl" />
                <span>ПН-ПТ, 9:00 до 19:00</span>
              </div>
              <div className="flex items-center gap-3">
                <FaDirections className="text-xl" />
                <span>Надіслати повідомлення менеджеру</span>
                <input
                  type="text"
                  placeholder="Enter your postcode..."
                  className="px-2 py-1 text-black rounded"
                />
                
                <button
                   onClick={handleSubmit}
                   className="bg-white text-black font-bold px-3 py-1 rounded hover:bg-gray-400"
                 >
                   Відправити!
                 </button>                  
              </div>
            </div>

            {/* Google map */}
            <div className="mt-6 md:mt-0 md:ml-8">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.4324168793125!2d0.0806503159567501!3d52.05654977973262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d88bfbef1cf6cb%3A0x529a80e8c7dc7ea9!2sMotorDesk!5e0!3m2!1sen!2suk!4v1715400000000"
                width="300"
                height="200"
                allowFullScreen
                loading="lazy"
                className="rounded"
              ></iframe>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bg-gray-800 text-center py-3 text-sm flex flex-col md:flex-row justify-between px-8 text-gray-400">
            <p>© 2024 Will’s Wheels | Privacy Policy | Contact Us</p>
            <p>Powered by AutoBazar Car Dealer Software</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;
