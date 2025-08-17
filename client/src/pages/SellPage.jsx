import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllposts } from '../redux/features/auth/post/fixed_postSlice';
import { PostItem } from '../components/Postitem';
import { PostFilters } from '../components/PostFilters';

export const SellPage = () => {
    const dispatch = useDispatch();
    const { posts, popularPosts, page, pages, hasMore, loading } = useSelector(state => state.post);

    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const timeoutId = useRef(null);

    // Загрузка першої сторінки
    useEffect(() => {
        const apiFilters = { ...filters, sortBy: sortBy, search: searchQuery };
        dispatch(getAllposts({ filters: apiFilters, page: 1, limit: 12 }));
    }, [dispatch, filters, sortBy, searchQuery]);

    // Скрол підвантаження
    const observer = useRef();
    const lastPostRef = useRef();

    useEffect(() => {
        if (!hasMore || loading) return;
        const options = { root: null, rootMargin: '0px', threshold: 1.0 };
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const apiFilters = { ...filters, sortBy: sortBy, search: searchQuery };
                dispatch(getAllposts({ filters: apiFilters, page: page + 1, limit: 12 }));
            }
        }, options);

        if (lastPostRef.current) {
            observer.current.observe(lastPostRef.current);
        }

        return () => observer.current?.disconnect();
    }, [lastPostRef.current, hasMore, loading, filters, sortBy, searchQuery]);

    const handleFilterChange = (newFilters) => setFilters(newFilters);
    const handleSortChange = (newSort) => setSortBy(newSort);
    const handleSearchChange = (query) => setSearchQuery(query);

    return (
        <div className="container mx-auto py-6 px-4">
            <PostFilters
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts?.map((post, idx) => {
                    if (idx === posts.length - 1) {
                        return <PostItem key={post._id} post={post} ref={lastPostRef} />;
                    }
                    return <PostItem key={post._id} post={post} />;
                })}
            </div>

            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Завантаження постів...</p>
                </div>
            )}

            {/* Кнопки пагінації */}
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: pages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 border rounded ${i + 1 === page ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => {
                            const apiFilters = { ...filters, sortBy: sortBy, search: searchQuery };
                            dispatch(getAllposts({ filters: apiFilters, page: i + 1, limit: 12 }));
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
