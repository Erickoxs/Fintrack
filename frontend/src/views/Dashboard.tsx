import React, { useEffect, useState } from 'react';
import Username from '../components/Username';
import LogoutButton from '../components/LogoutButton';
import BalanceContainer from '../components/BalanceContainer';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import AddTransaction from '../components/AddTransactionButton';
import HistorialButton from '../components/HistorialButton'; // ✅ Importación nueva
import api from '../utils/api';

type Transaccion = {
  _id?: string;
  user_id: string;
  title: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category: string;
  date: string;
};

const Dashboard = () => {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerTransacciones = async () => {
      try {
        const res = await api.get('/transactions');
        setTransacciones(res.data);
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerTransacciones();
  }, []);

  if (cargando) return <p className="p-4">Cargando Dashboard...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Username />
        <LogoutButton />
      </div>

      {/* Botón de historial */}
      <div className="mb-4">
        <HistorialButton />
      </div>

      {/* Balance */}
      <div className="mb-6">
        <BalanceContainer transacciones={transacciones} />
      </div>

      {/* BarChart */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <BarChart transacciones={transacciones} />
      </div>

      {/* PieChart */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <PieChart transacciones={transacciones} />
      </div>

      {/* Botón flotante para agregar transacción */}
      <AddTransaction />
    </div>
  );
};

export default Dashboard;
