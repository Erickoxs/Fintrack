import React, { useMemo } from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type Transaccion = {
  _id?: string;
  user_id: string;
  title: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category: string; // nombre o id
  date: string;
};

type Props = {
  transacciones: Transaccion[];
};

// Colores para las categorías
const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#ff6384',
  '#36a2eb', '#a3e635', '#facc15', '#e879f9', '#38bdf8'
];

const PieChart = ({ transacciones }: Props) => {
  const datosPorCategoria = useMemo(() => {
    const gastos = transacciones.filter(t => t.type === 'gasto');

    const agrupado = gastos.reduce((acc, t) => {
      const nombreCategoria = typeof t.category === 'string'
        ? t.category
        : t.category.name;

      acc[nombreCategoria] = (acc[nombreCategoria] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(agrupado).map(([categoria, monto]) => ({
      name: categoria,
      value: monto,
    }));
  }, [transacciones]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Gastos por categoría</h2>
      {datosPorCategoria.length === 0 ? (
        <p>No hay datos para mostrar.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RePieChart>
            <Pie
              data={datosPorCategoria}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {datosPorCategoria.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => `$${value}`} />
            <Legend />
          </RePieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};


export default PieChart;
