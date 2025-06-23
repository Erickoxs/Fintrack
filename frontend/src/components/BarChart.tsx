import React, { useMemo, useState } from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

type Transaccion = {
  _id?: string;
  user_id: string;
  title: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category: string;
  date: string;
};

type Props = {
  transacciones: Transaccion[];
};

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const formatCantidad = (valor: number) => {
  if (valor >= 1_000_000_000) return `${(valor / 1_000_000_000).toFixed(1)}B`;
  if (valor >= 1_000_000) return `${(valor / 1_000_000).toFixed(1)}M`;
  if (valor >= 1_000) return `${(valor / 1_000).toFixed(1)}K`;
  return valor;
};

const BarChart = ({ transacciones }: Props) => {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<'ingreso' | 'gasto'>('ingreso');

  const datosPorMes = useMemo(() => {
    const transFiltradas = transacciones.filter(t => t.type === tipoSeleccionado);

    const agrupado = transFiltradas.reduce((acc, t) => {
      const fecha = new Date(t.date);
      const mes = fecha.getMonth(); // 0-11
      acc[mes] = (acc[mes] || 0) + t.amount;
      return acc;
    }, {} as Record<number, number>);

    const datos: { mes: string; monto: number }[] = Object.entries(agrupado)
      .filter(([, monto]) => monto > 0)
      .map(([mes, monto]) => ({
        mes: meses[parseInt(mes)],
        monto,
      }));

    return datos;
  }, [transacciones, tipoSeleccionado]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#2C3E50]">
          Gráfico de {tipoSeleccionado === 'ingreso' ? 'ingresos' : 'gastos'} por mes
        </h2>
        <select
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value as 'ingreso' | 'gasto')}
          className="border border-gray-300 rounded px-2 py-1 text-[#2d3436]"
        >
          <option value="ingreso">Ingresos</option>
          <option value="gasto">Gastos</option>
        </select>
      </div>

      {datosPorMes.length === 0 ? (
        <p className="text-[#636e72]">No hay datos para mostrar.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <ReBarChart data={datosPorMes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={formatCantidad} />
            <Tooltip formatter={(value: any) => `$${value}`} />
            <Bar
              dataKey="monto"
              fill={tipoSeleccionado === 'ingreso' ? '#27AE60' : '#E74C3C'}
            />
          </ReBarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChart;
