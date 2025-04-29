import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const { user } = useSelector((state) => state.post);
  const username = user?.username || 'Гість';
  const activeStyles = {
    color: 'black',
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Закриття профілю при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex py-8 px-6 justify-center items-center bg-white shadow-md">
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className="text-sm text-gray-500 hover:text-red-400 font-bold"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sell"
              className="text-sm text-gray-500 hover:text-red-400 font-bold"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Продаж автомобілів
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              className="text-sm text-gray-500 hover:text-red-400 font-bold"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мої пости
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="flex justify-center items-center bg-green-600 text-sm text-white rounded-xl hover:bg-green-700 px-4 py-2 font-bold"
            >
              Додати пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex items-center gap-4">
        {isAuth && (
          <div className="relative" ref={profileRef}>
            <button onClick={() => setShowProfile((prev) => !prev)}>
              <img
                src="https://i.pravatar.cc/40" // Аватарка
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-105 transition"
              />
            </button>
            {showProfile && (
              <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-lg w-60 p-4 z-50">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/60"
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-left">{username}</p>
                    <p className="text-sm text-green-500">Підписка: Активна</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block text-blue-500 mt-3 hover:underline text-sm"
                >
                  Перейти до профілю
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 text-red-500 hover:underline text-sm"
                >
                  Вийти
                </button>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-600 text-white rounded-xl px-4 py-2 font-bold text-sm hover:bg-gray-700 transition">
          {isAuth ? null : <Link to="/login">Увійти</Link>}
        </div>
      </div>
    </div>
  );
};
