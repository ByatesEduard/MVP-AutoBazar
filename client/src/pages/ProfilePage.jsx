import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, getAllposts } from '../redux/features/auth/post/fixed_postSlice';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, posts } = useSelector((state) => state.post);

  useEffect(() => {
    const userId = '67e010291ede3c2f01949d32'; // Замінити на актуальний ID
    dispatch(fetchUser(userId));
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllposts({ user: user._id }));
    }
  }, [dispatch, user?._id]);

  // --- Обчислення статистики ---
  const brandStats = {};
  let totalPrice = 0;

  posts.forEach((post) => {
    const brand = post.brand || 'Невідомо';
    brandStats[brand] = (brandStats[brand] || 0) + 1;
    totalPrice += post.price;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      {/* --- КОРИСТУВАЧ --- */}
      <div className="flex items-center gap-6 border-b pb-6">
        <img
          src={user?.avatar || 'https://i.pravatar.cc/100'}
          alt="avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-black">{user?.username}</h1>
          <p className="text-sm text-gray-500">
            Дата реєстрації: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-green-600">
            Підписка: {user?.subscription ? 'Активна' : 'Немає'}
          </p>
        </div>
      </div>

      {/* --- ПОСТИ + СТАТИСТИКА --- */}
      <h2 className="mt-10 text-xl font-bold">Ваші пости</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Пости */}
        <div className="md:col-span-2 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={post.imgUrl}
                    alt="car"
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-black">
                        Номер: {post.numberPlate}
                      </p>
                    </div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.brand} • {post.year}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{post.price} ₴</p>
                  <p
                    className={`text-sm ${
                      post.isSold ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    {post.isSold ? 'Продано' : 'В наявності'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Поки що немає постів.</div>
          )}
        </div>

        {/* Статистика */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow-sm h-fit">
          <h3 className="text-lg font-bold mb-2">Статистика</h3>
          <p className="mb-2 font-semibold">Загальна кількість: {posts.length}</p>
          <p className="mb-2 font-semibold text-green-600">Сума: {totalPrice} ₴</p>
          <div className="mt-2">
            <p className="font-semibold mb-1">Кількість по брендах:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {Object.entries(brandStats).map(([brand, count]) => (
                <li key={brand}>
                  {brand}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
