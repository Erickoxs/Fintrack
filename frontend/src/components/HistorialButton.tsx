import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistorialButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/history');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#2C3E50] text-white px-4 py-2 rounded-lg hover:bg-[#34495e] transition"
    >
      Historial
    </button>
  );
};

export default HistorialButton;
