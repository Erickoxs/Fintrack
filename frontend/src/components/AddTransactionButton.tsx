import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addTransaction'); // Cambia la ruta si usas otra
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#2C3E50] text-white text-3xl flex items-center justify-center shadow-lg hover:bg-[#1a252f] transition duration-200"
      aria-label="Agregar transacción"
    >
      +
    </button>
  );
};

export default AddTransaction;
