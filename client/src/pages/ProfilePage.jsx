import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, getAllposts } from '../redux/features/auth/post/fixed_postSlice'; 


export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, posts,  } = useSelector((state) => state.post); // Отримуємо дані з Redux

  useEffect(() => {
    // Отримуємо ID користувача (припустимо, він доступний звідкись, наприклад, з URL або з іншого місця в Redux)
    const userId = '67e010291ede3c2f01949d32'; // Замініть на фактичний ID користувача
    dispatch(fetchUser(userId)); // Отримуємо дані користувача

  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllposts({ user: user._id }));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
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

      {/* --- ПОСТИ --- */}
      <h2 className="mt-10 text-xl font-bold">Ваші пости</h2>
      <div className="mt-4 space-y-4">
        {posts.length > 0 ? ( // Перевірка наявності постів перед відображенням
          posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={post.imgUrl}
                  alt="car"
                  className="w-32 h-20 object-cover rounded-lg"
                />
                <div>

                  <div className='flex items-center gap-4'>
                    <p className='text-sm text-black '>
                      {post.numberPlate}
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
          <div>Поки що немає постів.</div> // Повідомлення, якщо постів немає
        )}
      </div>

      {/* --- СТАТИСТИКА ПРОДАНИХ --- */}
      {/* (Цей розділ залежить від наявності soldStats, які ви, здається, не отримуєте з Redux) */}
    </div>
  );
};

export default ProfilePage;
