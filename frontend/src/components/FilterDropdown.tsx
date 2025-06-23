import React, { useState } from 'react';

type Filtro = 'year' | 'month' | 'category';

type Props = {
  onFilterChange: (filtro: Filtro) => void;
};

const FilterDropdown = ({ onFilterChange }: Props) => {
  const [abierto, setAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Filtro | null>(null);

  const opciones: { label: string; value: Filtro }[] = [
    { label: 'Año', value: 'year' },
    { label: 'Mes', value: 'month' },
    { label: 'Categoría', value: 'category' },
  ];

  const manejarSeleccion = (valor: Filtro) => {
    setSeleccionado(valor);
    setAbierto(false);
    onFilterChange(valor);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setAbierto(!abierto)}
        className="bg-[#2C3E50] text-white px-4 py-2 rounded-md hover:bg-[#34495e] transition"
      >
        Filtrar por {seleccionado ? `: ${opciones.find(o => o.value === seleccionado)?.label}` : ''}
      </button>

      {abierto && (
        <div className="absolute z-10 mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-200">
          {opciones.map(opcion => (
            <button
              key={opcion.value}
              onClick={() => manejarSeleccion(opcion.value)}
              className="block w-full text-left px-4 py-2 text-[#2d3436] hover:bg-gray-100"
            >
              {opcion.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
