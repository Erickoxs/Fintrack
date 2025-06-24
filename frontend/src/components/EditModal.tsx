import React, { useState, useEffect } from 'react';
import { Transaccion } from '../types'; // ajusta si tu tipo está en otro lugar

type Props = {
  transaccion: Transaccion;
  onGuardar: (transaccion: Transaccion) => void;
  onCerrar: () => void;
};

const categorias = [
  {
    _id: '68570f6f648b168a84cf0dff',
    name: 'Comida',
    icon: '🍔',
    color: '#f5320f'
  },
  {
    _id: '6859b7a1a8abb26031ffb405',
    name: 'Ocio',
    icon: '🎮',
    color: '#8b5cf6'
  },
  {
    _id: '6859b7aca8abb26031ffb407',
    name: 'Transporte',
    icon: '🚌',
    color: '#f97316'
  },
  {
    _id: '6859b7b7a8abb26031ffb409',
    name: 'Otros',
    icon: '📦',
    color: '#6b7280'
  },
   {
        "_id": "685ac451cfffd5fb2024314e",
        "name": "Ingreso",
        "icon": "💰",
        "color": "#2ecc71",
    }
];




const EditModal = ({ transaccion, onGuardar, onCerrar }: Props) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'ingreso',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    setForm({
      title: transaccion.title,
      amount: transaccion.amount.toString(),
      type: transaccion.type,
      category: typeof transaccion.category === 'string' ? transaccion.category : transaccion.category._id,
      date: new Date(transaccion.date).toISOString().split('T')[0],
    });
  }, [transaccion]);

  const categoriasFiltradas = form.type === 'ingreso'
  ? categorias.filter(cat => cat.name === 'Ingreso')
  : categorias.filter(cat => cat.name !== 'Ingreso');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const actualizada: Transaccion = {
      ...transaccion,
      ...form,
      amount: parseFloat(form.amount),
    };

    onGuardar(actualizada);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-[#2d3436]"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#2C3E50]">Editar Transacción</h2>

        <div className="mb-4">
          <label className="block mb-1 text-[#636e72]">Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-[#636e72]">Monto</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-[#636e72]">Tipo</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-[#636e72]">Categoría</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categoriasFiltradas.map(cat => (
  <option key={cat._id} value={cat._id}>
    {cat.icon} {cat.name}
  </option>
))}

          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-[#636e72]">Fecha</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCerrar}
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#2C3E50] text-white py-2 px-4 rounded hover:bg-[#1a252f] transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
