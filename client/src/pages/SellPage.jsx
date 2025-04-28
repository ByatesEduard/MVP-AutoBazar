import React, { useEffect, useState, useRef } from 'react';
import { PostItem } from '../components/Postitem';
import { PopularPost } from '../components/PopularPost';
import { useDispatch, useSelector } from 'react-redux';
import { getAllposts } from '../redux/features/auth/post/fixed_postSlice';
import image1 from '../img/img1 (1).png';
import image2 from '../img/BMW_1_1024x576.jpg';
import image3 from '../img/201603151.png';
import image4 from '../img/BMW.png';

export const SellPage = () => {
    const dispatch = useDispatch();
    const { posts, popularPost } = useSelector((state) => state.post);

    const [filters, setFilters] = useState({
        priceMin: '',
        priceMax: '',
        mileageMin: '',
        mileageMax: '',
        yearMin: '',
        yearMax: '',
        brand: '',
        fuel: '',
        transmission: '',
        sortBy: '',
        sortOrder: '',
        drive: '',
        engine: '',
    });

    const icons = {};
     for (let i = 1; i <= 35; i++) {
       icons[`${i}`] = require(`../icon/${i}.jpg`);
     }

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const timeoutId = useRef(null);

    useEffect(() => {
        dispatch(getAllposts(filters));
    }, [dispatch, filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            dispatch(getAllposts({ ...filters, [e.target.name]: e.target.value }));
        }, 500);
    };

    return (
        <div className="max-w-[1300px] mx-auto py-4 px-4">
            <div className="mb-8 bg-red-400 p-4 rounded-xl shadow-md">
                <h2 className="text-lg font-bold mb-4">Фільтри</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <input type="number" placeholder="Мін. ціна" className="border p-2 rounded" value={filters.priceMin} name="priceMin" onChange={handleFilterChange} />
                    <input type="number" placeholder="Макс. ціна" className="border p-2 rounded" value={filters.priceMax} name="priceMax" onChange={handleFilterChange} />
                    <input type="number" placeholder="Мін. пробіг" className="border p-2 rounded" value={filters.mileageMin} name="mileageMin" onChange={handleFilterChange} />
                    <input type="number" placeholder="Макс. пробіг" className="border p-2 rounded" value={filters.mileageMax} name="mileageMax" onChange={handleFilterChange} />
                    <input type="number" placeholder="Рік від" className="border p-2 rounded" value={filters.yearMin} name="yearMin" onChange={handleFilterChange} />
                    <input type="number" placeholder="Рік до" className="border p-2 rounded" value={filters.yearMax} name="yearMax" onChange={handleFilterChange} />
                    <input type="text" placeholder="Марка (наприклад BMW)" className="border p-2 rounded" value={filters.brand} name="brand" onChange={handleFilterChange} />
                    <select className="border p-2 rounded" value={filters.fuel} name="fuel" onChange={handleFilterChange}>
                        <option value="">Паливо</option>
                        <option value="gasoline">Бензин</option>
                        <option value="diesel">Дизель</option>
                        <option value="gaz/gasoline">Газ/Бензин</option>
                        <option value="electro">Електро</option>
                    </select>
                    <select className="border p-2 rounded" value={filters.transmission} name="transmission" onChange={handleFilterChange}>
                        <option value="">Трансмісія</option>
                        <option value="manual">Механіка</option>
                        <option value="automatic">Автомат</option>
                    </select>

                    {showAdvancedFilters && (
                        <>
                            <select className="border p-2 rounded" value={filters.drive} name="drive" onChange={handleFilterChange}>
                                <option value="">Привід</option>
                                <option value="RWD">RWD</option>
                                <option value="FWD">FWD</option>
                                <option value="AWD">AWD</option>
                            </select>
                            <select className="border p-2 rounded" value={filters.engine} name="engine" onChange={handleFilterChange}>
                                <option value="">Об'єм двигуна</option>
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
                        </>
                    )}
                </div>

                <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {showAdvancedFilters ? 'Приховати розширений пошук' : 'Розширений пошук'}
                </button>
            </div>

            <div className="mt-8 flex gap-6">
                <select className=" bg-white border p-2 rounded" value={filters.sortBy} name="sortBy" onChange={handleFilterChange}>
                    <option value="">Сортувати за</option>
                    <option value="price">Ціною</option>
                    <option value="mileage">Пробігом</option>
                </select>
                <select className=" bg-white border p-2  rounded" value={filters.sortOrder} name="sortOrder" onChange={handleFilterChange}>
                    <option value="">Порядок</option>
                    <option value="asc">Зростання</option>
                    <option value="desc">Спадання</option>
                </select>
            </div>

            <div className='mt-10 flex gap-8'>
                <div className='font-bold text-black text-xl '>
                    Марки автомобілів:
                    <div className='flex flex-wrap gap-2'>
                        {Object.keys(icons).map((key) => (
                            <img key={key} src={icons[key]} alt={`Icon ${key}`} className="w-16 h-16 object-contain" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex mt-10 gap-10">
                {/* Блок зліва — реклама */}
                <div className="fixed top-[10px] left-0 bg-[]  rounded-r-lg shadow-lg flex flex-col gap-3 z-50 h-screen overflow-y-auto">
                    <div className="flex flex-col gap-1">
                        <img
                            src={image1}
                            alt="Реклама 1"
                            className="w-[260px] h-[200px] object-left object-cover rounded-md hover:scale-95 transition-transform duration-200 max-w-full"
                        />
                        <img
                            src={image2}
                            alt="Реклама 2"
                            className="w-[260px] h-[260px] object-cover rounded-md hover:scale-95 transition-transform duration-200 max-w-full"
                        />
                        <img
                            src={image3}
                            alt="Реклама 3"
                            className="w-[260px] h-[260px] object-cover rounded-md hover:scale-95 transition-transform duration-200 max-w-full"
                        />
                        <img
                            src={image4}
                            alt="Реклама 4"
                            className="w-[260px] h-[200px] object-cover rounded-md hover:scale-95 transition-transform duration-200 max-w-full"
                        />
                    </div>
                </div>

                {/* Основна частина — пости */}
                <div className="grid grid-cols-2 gap-10 flex-grow">
                    {posts?.length ? (
                        posts.map((post, idx) => <PostItem key={idx} post={post} />)
                    ) : (
                        <div className="text-center col-span-2 text-gray-500">Нічого не знайдено</div>
                    )}
                </div>

                {/* Блок справа — популярні пости */}
                <div className="basis-1/5">
                    <div className="text-xs uppercase text-black mb-2">Популярні:</div>
                    {popularPost?.map((post, idx) => (
                        <PopularPost key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};