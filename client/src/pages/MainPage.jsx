import React, { useState } from 'react';
import image5 from '../img/logo.jpg';
import header from '../img/header.jpg';
import image10 from '../img/18337.avif';
import image11 from '../img/18395.avif';

const VIYSKOVYI_ZBIR_URL = 'https://send.monobank.ua/jar/9Ud7dzjvrb';

const MainPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  const handleSupportClick = () => {
    window.location.href = VIYSKOVYI_ZBIR_URL;
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100, user: 'Користувач' }) // 100 грн, змінюй як потрібно
      });
  
      const data = await response.json();
  
      // Відкриваємо нове вікно з формою LiqPay
      const paymentWindow = window.open('', '_blank');
      paymentWindow.document.write(data.html);
      paymentWindow.document.close();
    } catch (error) {
      console.error('Помилка при створенні платежу:', error);
      alert('Не вдалося ініціювати оплату');
    }
  };
  

  const renderCatalog = () => {
    return (
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
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen p-4">
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
            {/* Контент до каталогу */}
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
      </div>
    </div>
  );
};

export default MainPage;
