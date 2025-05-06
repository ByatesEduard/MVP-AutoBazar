import React, { useEffect, useState, useRef } from 'react';
import { PostItem } from '../components/Postitem';
import { PopularPost } from '../components/PopularPost';
import { useDispatch, useSelector } from 'react-redux';
import { getAllposts } from '../redux/features/auth/post/fixed_postSlice';

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
        sortBy: 'createdAt', // Змінено на 'createdAt' для сортування за датою
        sortOrder: 'desc', // За замовчуванням сортуємо за спаданням (найновіші спочатку)
        drive: '',
        engine: '',
    });

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
        <div className="container mx-auto py-6 px-4 flex">
            {/* Фільтри */}
            <div className="w-1/4 bg-white p-6 rounded-lg shadow-md mr-8">
                <h2 className="text-lg font-semibold text-blue-600 mb-4">Фільтри</h2>
                <div className="space-y-4">
                    <input 
                        type="number" 
                        placeholder="Мін. ціна" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.priceMin} 
                        name="priceMin" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Макс. ціна" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.priceMax} 
                        name="priceMax" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Мін. пробіг" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.mileageMin} 
                        name="mileageMin" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Макс. пробіг" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.mileageMax} 
                        name="mileageMax" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Рік від" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.yearMin} 
                        name="yearMin" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="number" 
                        placeholder="Рік до" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.yearMax} 
                        name="yearMax" 
                        onChange={handleFilterChange} 
                    />
                    <input 
                        type="text" 
                        placeholder="Марка (наприклад BMW)" 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.brand} 
                        name="brand" 
                        onChange={handleFilterChange} 
                    />

                    <select 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.fuel} 
                        name="fuel" 
                        onChange={handleFilterChange}
                    >
                        <option value="">Паливо</option>
                        <option value="gasoline">Бензин</option>
                        <option value="diesel">Дизель</option>
                        <option value="gaz/gasoline">Газ/Бензин</option>
                        <option value="electro">Електро</option>
                    </select>
                    <select 
                        className="w-full border p-2 rounded-lg" 
                        value={filters.transmission} 
                        name="transmission" 
                        onChange={handleFilterChange}
                    >
                        <option value="">Трансмісія</option>
                        <option value="manual">Механіка</option>
                        <option value="automatic">Автомат</option>
                    </select>

                    {showAdvancedFilters && (
                        <>
                            <select 
                                className="w-full border p-2 rounded-lg" 
                                value={filters.drive} 
                                name="drive" 
                                onChange={handleFilterChange}
                            >
                                <option value="">Привід</option>
                                <option value="RWD">RWD</option>
                                <option value="FWD">FWD</option>
                                <option value="AWD">AWD</option>
                            </select>
                            <select 
                                className="w-full border p-2 rounded-lg" 
                                value={filters.engine} 
                                name="engine" 
                                onChange={handleFilterChange}
                            >
                                <option value="">Об'єм двигуна</option>
                                <option value="0.6l">0.6</option>
                                <option value="1.0l">1.0</option>
                                <option value="2.0l">2.0</option>
                                <option value="3.0l">3.0</option>
                            </select>
                        </>
                    )}

                    <button 
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} 
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        {showAdvancedFilters ? 'Приховати' : 'Показати розширений пошук'}
                    </button>
                </div>
            </div>

            {/* Пости */}
            <div className="flex-1">
                {/* Сортування */}
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <label htmlFor="sortBy" className="mr-2 text-lg text-blue-600">Сортувати за:</label>
                        <select 
                            id="sortBy" 
                            className="border p-2 rounded-lg"
                            value={filters.sortBy} 
                            name="sortBy" 
                            onChange={handleFilterChange}
                        >
                            <option value="price">Ціна</option>
                            <option value="year">Рік</option>
                            <option value="mileage">Пробіг</option>
                            <option value="createdAt">Дата</option> {/* Додано сортування за датою */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sortOrder" className="mr-2 text-lg text-blue-600">Порядок:</label>
                        <select 
                            id="sortOrder" 
                            className="border p-2 rounded-lg"
                            value={filters.sortOrder} 
                            name="sortOrder" 
                            onChange={handleFilterChange}
                        >
                            <option value="asc">Зростанням</option>
                            <option value="desc">Спаданням</option>
                        </select>
                    </div>
                </div>

                {/* Сітка постів */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts?.length ? (
                        posts.map((post, idx) => <PostItem key={idx} post={post} />)
                    ) : (
                        <div className="text-center col-span-3 text-gray-500">Нічого не знайдено</div>
                    )}
                </div>
            </div>
        </div>
    );
};
