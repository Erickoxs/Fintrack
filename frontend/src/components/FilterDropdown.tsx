import React, { useState } from 'react';

type Filtro = 'year' | 'month' | 'category';

type Categoria = {
  _id: string;
  name: string;
  icon: string;
};

type Props = {
  onFilterChange: (
    filtro:
      | { tipo: 'year'; year: number }
      | { tipo: 'month'; month: number; year: number }
      | { tipo: 'category'; categoriaId: string }
  ) => void;
};

const categorias: Categoria[] = [
  { _id: '68570f6f648b168a84cf0dff', name: 'Comida', icon: '🍔' },
  { _id: '6859b7a1a8abb26031ffb405', name: 'Ocio', icon: '🎮' },
  { _id: '6859b7aca8abb26031ffb407', name: 'Transporte', icon: '🚌' },
  { _id: '6859b7b7a8abb26031ffb409', name: 'Otros', icon: '📦' },
];

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const FilterDropdown = ({ onFilterChange }: Props) => {
  const [abierto, setAbierto] = useState(false);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<Filtro | null>(null);
  const [anio, setAnio] = useState<number>(new Date().getFullYear());
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);

  const manejarFiltro = (tipo: Filtro) => {
    setFiltroSeleccionado(tipo);
    setAbierto(false);
  };

  const manejarCategoria = (id: string) => {
    onFilterChange({ tipo: 'category', categoriaId: id });
  };

  const manejarYearSubmit = () => {
    onFilterChange({ tipo: 'year', year: anio });
  };

  const manejarMonthSubmit = () => {
    const currentYear = new Date().getFullYear();
    onFilterChange({ tipo: 'month', month: mes, year: currentYear });
  };

  return (
    <div className="relative text-left mb-4 space-y-2">
      <button
        onClick={() => setAbierto(!abierto)}
        className="bg-[#2C3E50] text-white px-4 py-2 rounded-md hover:bg-[#34495e] transition"
      >
        Filtrar por
      </button>

      {abierto && (
        <div className="absolute z-10 mt-2 w-44 bg-white rounded-md shadow-lg border border-gray-200">
          {(['year', 'month', 'category'] as Filtro[]).map(opcion => (
            <button
              key={opcion}
              onClick={() => manejarFiltro(opcion)}
              className="block w-full text-left px-4 py-2 text-[#2d3436] hover:bg-gray-100"
            >
              {opcion === 'year' ? 'Año' : opcion === 'month' ? 'Mes' : 'Categoría'}
            </button>
          ))}
        </div>
      )}

      {filtroSeleccionado === 'category' && (
        <select
          onChange={(e) => manejarCategoria(e.target.value)}
          defaultValue=""
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="" disabled>Selecciona una categoría</option>
          {categorias.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      )}

      {filtroSeleccionado === 'year' && (
        <div className="flex items-center gap-2">
          <select
            value={anio}
            onChange={(e) => setAnio(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {[2023, 2024, 2025].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button
            onClick={manejarYearSubmit}
            className="bg-[#2C3E50] text-white px-3 py-1 rounded hover:bg-[#34495e]"
          >
            Aplicar
          </button>
        </div>
      )}

      {filtroSeleccionado === 'month' && (
        <div className="flex gap-2 items-center">
          <select
            value={mes}
            onChange={(e) => setMes(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {meses.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <button
            onClick={manejarMonthSubmit}
            className="bg-[#2C3E50] text-white px-3 py-1 rounded hover:bg-[#34495e]"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
