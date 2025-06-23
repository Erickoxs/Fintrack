import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import FilterDropdown from '../components/FilterDropdown';
import TypeSelector from '../components/TypeSelector';
import TransactionsContainer from '../components/TransactionsContainer';
import BackArrow from '../components/BackArrow';
import ConfirmationModal from '../components/ConfirmationModal';
import EditModal from '../components/EditModal';

type Transaccion = {
  _id: string;
  title: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  category: { name: string } | string;
  date: string;
};

type FiltroTipo =
  | { tipo: 'year'; year: number }
  | { tipo: 'month'; month: number; year: number }
  | { tipo: 'category'; categoriaId: string };

const History = () => {
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('ingreso');
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState<string | null>(null);
  const [transaccionEditando, setTransaccionEditando] = useState<Transaccion | null>(null);

  const obtenerTransacciones = async (url: string) => {
    try {
      setCargando(true);
      const res = await api.get<Transaccion[]>(url);
      setTransacciones(res.data);
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
    } finally {
      setCargando(false);
    }
  };

  // Mostrar todas las transacciones al montar
  useEffect(() => {
    obtenerTransacciones('/transactions');
  }, []);

  const manejarFiltro = async (filtro?: FiltroTipo) => {
    if (!filtro) {
      obtenerTransacciones('/transactions');
    } else if (filtro.tipo === 'year') {
      obtenerTransacciones(`/transactions/by-year?year=${filtro.year}`);
    } else if (filtro.tipo === 'month') {
      obtenerTransacciones(`/transactions/by-month?month=${filtro.month}&year=${filtro.year}`);
    } else if (filtro.tipo === 'category') {
      obtenerTransacciones(`/transactions/by-category/${filtro.categoriaId}`);
    }
  };

  const confirmarEliminacion = (id: string) => {
    setIdAEliminar(id);
    setMostrarConfirmacion(true);
  };

  const eliminarTransaccion = async () => {
    if (!idAEliminar) return;
    try {
      await api.delete(`/transactions/${idAEliminar}`);
      setTransacciones(prev => prev.filter(t => t._id !== idAEliminar));
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      setMostrarConfirmacion(false);
      setIdAEliminar(null);
    }
  };

  const guardarEdicion = async (transActualizada: Transaccion) => {
    try {
      await api.put(`/transactions/${transActualizada._id}`, transActualizada);
      setTransaccionEditando(null);
      window.location.reload();
    } catch (error) {
      console.error('Error al editar la transacción:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-4">
      <div className="flex justify-between items-center mb-4">
        <BackArrow to="/dashboard" />
        <h1 className="text-xl font-semibold text-[#2d3436]">Historial</h1>
      </div>

      <TypeSelector onTipoChange={setTipo} />
      <FilterDropdown onFilterChange={manejarFiltro} />

      {cargando ? (
        <p className="text-[#636e72]">Cargando transacciones...</p>
      ) : (
        <TransactionsContainer
          transacciones={transacciones.filter(t => t.type === tipo)}
          onEditar={(id) => {
            const encontrada = transacciones.find(t => t._id === id);
            if (encontrada) setTransaccionEditando(encontrada);
          }}
          onEliminar={confirmarEliminacion}
        />
      )}

      {mostrarConfirmacion && (
        <ConfirmationModal
          mensaje="¿Estás seguro de que deseas eliminar esta transacción?"
          onConfirmar={eliminarTransaccion}
          onCancelar={() => setMostrarConfirmacion(false)}
        />
      )}

      {transaccionEditando && (
        <EditModal
          transaccion={transaccionEditando}
          onGuardar={guardarEdicion}
          onCerrar={() => setTransaccionEditando(null)}
        />
      )}
    </div>
  );
};

export default History;
