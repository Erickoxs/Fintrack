import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  to: string;
};

const BackArrow = ({ to }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-gray-700 hover:text-black transition"
    >
      <img src="/izquierda.png" alt="Volver" className="w-5 h-5" />
      <span>Volver</span>
    </button>
  );
};

export default BackArrow;
