import React from 'react';
import pencilIcon from '/pencil.png';
import xIcon from '/x.png';

type Transaccion = {
  _id: string;
  title: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category: { name: string } | string;
  date: string;
};

type Props = {
  transacciones: Transaccion[];
  onEditar?: (id: string) => void;
  onEliminar?: (id: string) => void;
};

const TransactionsContainer = ({ transacciones, onEditar, onEliminar }: Props) => {
  if (transacciones.length === 0) {
    return <p className="text-center text-[#636e72]">No hay transacciones para mostrar.</p>;
  }

  return (
    <div className="space-y-4">
      {transacciones.map((t) => {
        const fecha = new Date(t.date).toLocaleDateString('es-CO', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

        return (
          <div
            key={t._id}
            className="bg-white rounded-lg shadow p-4 text-[#2d3436]"
          >
            <div className="flex justify-between mb-1 text-sm font-semibold">
              <span>{fecha}</span>
              <span>{t.title}</span>
            </div>
            <p className="text-sm text-[#636e72] mb-1">
              CATEGORÍA: {typeof t.category === 'string' ? t.category : t.category.name}
            </p>
            <div className="flex justify-between items-center">
              <p className={`font-bold ${t.type === 'ingreso' ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                CANTIDAD: ${t.amount.toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEditar?.(t._id)}
                  className="p-2 rounded hover:bg-gray-100 transition"
                  aria-label="Editar"
                >
                  <img src={pencilIcon} alt="Editar" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onEliminar?.(t._id)}
                  className="p-2 rounded hover:bg-gray-100 transition"
                  aria-label="Eliminar"
                >
                  <img src={xIcon} alt="Eliminar" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsContainer;
