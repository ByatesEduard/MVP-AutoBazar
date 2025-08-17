import React, { useEffect, useState, useRef } from 'react';
import { PostItem } from '../components/Postitem';
import { PopularPost } from '../components/PopularPost';
import { PostFilters } from '../components/PostFilters';
import { useDispatch, useSelector } from 'react-redux';
import { getAllposts } from '../redux/features/auth/post/fixed_postSlice';

export const SellPage = () => {
    const dispatch = useDispatch();
    const { posts, popularPost, loading } = useSelector((state) => state.post);

    console.log('SellPage - posts:', posts);
    console.log('SellPage - loading:', loading);
    console.log('SellPage - popularPost:', popularPost);

    const sideNews = [
    { title: 'Які нові авто краще купували в Україні у квітні?', date: '06 травня 2025' },
    { title: 'Автомобіль тижня: Volkswagen Tayron', date: '05 травня 2025' },
    { title: 'Надійні авто віком від 3 до 10 років за даними ADAC', date: '01 травня 2025' },
    { title: 'Автомобіль тижня: Chery Tiggo 4', date: '28 квітня 2025' }
  ];

    const [filters, setFilters] = useState({
        brand: '',
        priceMin: '',
        priceMax: '',
        yearMin: '',
        yearMax: '',
        fuel: '',
        transmission: '',
        bodyType: '',
        condition: '',
        hasAccident: '',
        mileageMax: '',
    });

    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const timeoutId = useRef(null);

    useEffect(() => {
        // Преобразуем фильтры в формат, который ожидает API
        const apiFilters = {
            ...filters,
            sortBy: sortBy === 'newest' ? 'createdAt' : 
                   sortBy === 'oldest' ? 'createdAt' :
                   sortBy === 'price_asc' ? 'price' :
                   sortBy === 'price_desc' ? 'price' :
                   sortBy === 'mileage_asc' ? 'mileage' :
                   sortBy === 'mileage_desc' ? 'mileage' :
                   sortBy === 'year_desc' ? 'year' :
                   sortBy === 'year_asc' ? 'year' : 'createdAt',
            sortOrder: sortBy === 'newest' || sortBy === 'price_desc' || sortBy === 'mileage_desc' || sortBy === 'year_desc' ? 'desc' : 'asc',
            search: searchQuery
        };
        
        console.log('SellPage - dispatching getAllposts with filters:', apiFilters);
        dispatch(getAllposts(apiFilters));
    }, [dispatch, filters, sortBy, searchQuery]);

    // Очистка timeout при размонтировании
    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    // Инициализация при первом рендере
    useEffect(() => {
        console.log('SellPage: Initial load');
        dispatch(getAllposts({}));
    }, [dispatch]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
    };

    const handleSearchChange = (newSearchQuery) => {
        setSearchQuery(newSearchQuery);
        
        // Debounce для поиска
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        
        timeoutId.current = setTimeout(() => {
            // Поиск будет обработан в useEffect
        }, 300);
    };

    return (
        <div className="container mx-auto py-6 px-4">
            {/* Фильтры */}
            <PostFilters 
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                initialFilters={filters}
                initialSortBy={sortBy}
                initialSearchQuery={searchQuery}
            />

            {/* Пости */}
            <div className="flex-1">
                {/* Сітка постів */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">Завантаження постів...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts?.length ? (
                            posts.map((post, idx) => <PostItem key={idx} post={post} />)
                        ) : (
                            <div className="text-center col-span-3 text-gray-500 py-8">
                                <p className="text-lg">Нічого не знайдено</p>
                                <p className="text-sm mt-2">Спробуйте змінити фільтри або пошуковий запит</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
