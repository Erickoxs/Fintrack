import React, { useState } from 'react';

type Tipo = 'ingreso' | 'gasto';

type Props = {
  onTipoChange: (tipo: Tipo) => void;
};

const TypeSelector = ({ onTipoChange }: Props) => {
  const [seleccionado, setSeleccionado] = useState<Tipo>('ingreso');

  const manejarCambio = (tipo: Tipo) => {
    setSeleccionado(tipo);
    onTipoChange(tipo);
  };

  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={() => manejarCambio('ingreso')}
        className={`px-4 py-2 rounded-md font-medium transition ${
          seleccionado === 'ingreso'
            ? 'bg-[#27AE60] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Ingresos
      </button>
      <button
        onClick={() => manejarCambio('gasto')}
        className={`px-4 py-2 rounded-md font-medium transition ${
          seleccionado === 'gasto'
            ? 'bg-[#E74C3C] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Gastos
      </button>
    </div>
  );
};

export default TypeSelector;
