import React from 'react';
import image5 from '../img/logo.jpg';
import header from '../img/header.jpg';
import image10 from '../img/18337.avif';
import image11 from '../img/18395.avif';

export const MainPage = () => {
    return (
        <div className="bg-gray-100 font-sans">
            <div className="container mx-auto p-4">
                <div className="flex justify-end mb-4">
                    <button className="bg-blue-500 text-white text-lg font-bold px-4 py-2 rounded">
                        Підтримати збір на авто для ЗСУ
                    </button>
                </div>
                <div className="flex bg-white rounded-lg shadow-md p-6">
                    <div className="w-1/3 pr-4">
                        <img src={header} alt="Автомобіль" className="rounded-lg mb-4 w-full" />
                        <div className="text-xl font-bold mb-2">ЩО ТА ЯК ПЕРЕВІРЯЄ AUTO.RIA</div>
                        <img src={image5} alt="AUTO.RIA Логотип" className="mb-2" />
                        <p className="text-lg font-bold">141 Частину перевірок ми робимо відразу після додавання авто.</p>
                        <p className="text-lg font-bold">Розширені перевірки можна замовити додатково.</p>
                    </div>
                    <div className="w-2/3 pl-4">
                        <div className="text-2xl font-bold mb-4">Щоб ви купували авто без сюрпризів, у нас є 32 перевірки</div>
                        
                        {/* Перевірка №27 */}
                        <div className="bg-gray-200 p-4 rounded-lg mb-4">
                            <div className="bg-orange-500 text-white px-2 py-1 rounded text-lg font-bold inline-block mb-2">
                                Перевірка №27
                            </div>
                            <p className="text-lg font-bold">Ця ластівка точно не в розшуку. Знаємо, бо перевірили в реєстрі МВС.</p>
                            <div className="mt-4">
                                <p className="font-bold mb-2">Як ми перевіряємо?</p>
                                <ol className="list-decimal list-inside">
                                    <li className="text-lg font-bold">Продавець додає авто на AUTO.RIA.</li>
                                    <li className="text-lg font-bold">Ми за VIN-кодом дізнаємося з реєстру МВС, що його не розшукують правоохоронці.</li>
                                </ol>
                            </div>
                        </div>


                        {/* Перевірка №31 */}
                        <img src={image11} alt="Макет телефону" className="w-[500px] mx-auto" />
                        <div className="bg-gray-200 p-4 rounded-lg mt-4">
                            <div className="bg-orange-500 text-white px-2 py-1 rounded text-lg font-bold inline-block mb-2">
                                Перевірка №31
                            </div>
                            <p className="text-lg font-bold">
                                Знаємо останній зафіксований пробіг цієї ластівки, бо перевірили через офіційні бази даних.
                            </p>
                            <div className="flex flex-wrap mt-2 text-sm">
                                <p className="mr-2 mb-1">Офіційні бази виробників</p>
                                <p className="mr-2 mb-1">Бази офіційних дилерів</p>
                                <p className="mr-2 mb-1">Страхові бази</p>
                                <p className="mr-2 mb-1">Українське бюро кредитних історій</p>
                                <p className="mr-2 mb-1">Державні реєстри транспортних засобів</p>
                                <p className="mr-2 mb-1">Архівні дані з аукціонів Америки</p>
                                <p className="mr-2 mb-1">Поліцейські бази</p>
                                <p className="mr-2 mb-1">Державний веб-портал відкритих даних</p>
                                <p className="mr-2 mb-1">Бази викрадених автомобілів країн Європи</p>
                                <p className="mr-2 mb-1">Реєстр заставного рухомого майна України</p>
                            </div>
                            <p className="mt-4">
                                AUTO.RIA перевіряє інформацію про пробіг кожної доданої автівки з VIN-кодом. Перевірений останній
                                зафіксований пробіг показуємо на сторінці авто.
                            </p>
                        </div>
                        <div className="flex items-center mt-4">
                            <img src={image10} alt="Макет телефону 31" className="w-1/3 mr-4" />
                            <div className="w-2/3">
                                <p className="text-sm font-bold">Пробіг і ДТП</p>
                                <p className="text-xs">Перевірено 14 березня 2024</p>
                                <p className="text-xs">Пробіг перевищено</p>
                                <p className="text-xs">149 тис. км з офіційного аукціону в США</p>
                                <p className="text-xs">Пробіг від продавця</p>
                                <p className="text-xs">100 тис. км</p>
                                <button className="bg-red-500 text-white px-2 py-1 rounded mt-2 text-sm">розбіжність</button>
                                <p className="mt-4 text-sm">
                                    Тоді покажемо різницю з реальним пробігом та дату початку розбіжності!
                                </p>
                            </div>
                        </div>
                        {/* Перевірка №15 */}
                        <div className="bg-gray-200 p-4 rounded-lg mb-4 w-full">
                            <div className="bg-orange-500 text-white px-2 py-1 rounded text-lg font-bold inline-block mb-2">
                                Перевірка №15
                            </div>
                            <p className="text-lg  font-bold mb-2">Виконуємо 10 дій, щоб перевірити авто на підробку VIN-коду:</p>
                            <ul className=" flex list-none pl-0 space-y-1">
                                <li><input type="checkbox" checked readOnly className="mr-2" />знаходимо VIN на кузові</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />перевіряємо оригінальність шрифту</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />оцінюємо, чи пошкоджена VIN-пластина</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />перевіряємо зварні шви навколо</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />оцінюємо рівень фарби</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />шукаємо дублюючі таблички</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />порівнюємо з VIN у документах</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />перевіряємо VIN по базам</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />аналізуємо історію авто</li>
                                <li><input type="checkbox" checked readOnly className="mr-2" />перевіряємо, чи все співпадає</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
