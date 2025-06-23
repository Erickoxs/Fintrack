import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
    >
      <img src="/logout.png" alt="Logout icon" className="w-5 h-5" />
    </button>
  );
};

export default LogoutButton;
