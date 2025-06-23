import React from 'react';

type Props = {
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
};

const ConfirmationModal = ({ mensaje, onConfirmar, onCancelar }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <p className="text-[#2d3436] mb-4">{mensaje}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="px-4 py-2 rounded bg-gray-300 text-[#2d3436] hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded bg-[#E74C3C] text-white hover:bg-red-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
